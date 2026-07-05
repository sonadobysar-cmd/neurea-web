#!/usr/bin/env node
/**
 * Počká na Next.js dev server a otevře /robin v prohlížeči.
 */
import { execSync } from "node:child_process";
import net from "node:net";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";

const ports = [3000, 3001, 3002, 3003, 3004, 3005];
const hosts = ["127.0.0.1", "localhost"];

function portOpen(hostname, port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: hostname, port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
    socket.setTimeout(1500, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function checkRobin(hostname, port) {
  return new Promise((resolve) => {
    const req = http.request(
      { hostname, port, path: "/robin", method: "GET", timeout: 30000 },
      (res) => {
        res.resume();
        resolve(res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 500);
      },
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function findServer() {
  for (let i = 0; i < 180; i++) {
    for (const port of ports) {
      for (const host of hosts) {
        if (await portOpen(host, port)) {
          process.stderr.write(`  Port ${port} aktivní, čekám na /robin…\n`);
          if (await checkRobin(host, port)) {
            return `http://${host}:${port}/robin`;
          }
        }
      }
    }
    if (i % 4 === 0) {
      process.stderr.write(`  …stále čekám (${Math.floor(i / 2)} s)\n`);
    }
    await delay(500);
  }
  return null;
}

async function main() {
  const url = await findServer();
  if (!url) {
    console.error("\n❌ Server se nespustil do 90 s.");
    console.error("   Zkus v terminálu:  cd ~/Neurea && npm run dev");
    console.error("   Pak otevři:        http://127.0.0.1:3000/robin\n");
    process.exit(1);
  }
  try {
    execSync(`open "${url}"`, { stdio: "inherit" });
    console.log(`\n  ✓ Otevřeno: ${url}\n`);
  } catch {
    console.log(`\n  ⚠ Nepodařilo se otevřít prohlížeč automaticky.`);
    console.log(`  Zkopíruj do prohlížeče: ${url}\n`);
  }
}

main();
