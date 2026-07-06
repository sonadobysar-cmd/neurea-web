#!/usr/bin/env node
/**
 * Počká na Robin web a otevře prohlížeč.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const portFile = path.join(root, "robin-dev.port");

const preferredPort = Number(process.env.ROBIN_PORT || 0);
const ports = preferredPort
  ? [preferredPort, 3000, 3001, 3002, 3003]
  : [3000, 3001, 3002, 3003, 3004, 3005];
const hosts = ["127.0.0.1", "localhost"];

function readSavedPort() {
  try {
    const n = Number(fs.readFileSync(portFile, "utf8").trim());
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

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
      { hostname, port, path: "/robin", method: "GET", timeout: 60000 },
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
  const saved = readSavedPort();
  const tryPorts = saved ? [saved, ...ports.filter((p) => p !== saved)] : ports;

  for (let i = 0; i < 120; i++) {
    for (const port of tryPorts) {
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
    console.error("\n❌ Web neběží.");
    console.error("   Dvakrát klikni: OTEVRI-ROBIN.command");
    console.error("   Nebo:           cd ~/Neurea && bash scripts/start-robin.sh\n");
    process.exit(1);
  }
  try {
    execSync(`open "${url}"`, { stdio: "inherit" });
    console.log(`\n  ✓ Otevřeno: ${url}\n`);
  } catch {
    console.log(`\n  ⚠ Zkopíruj do prohlížeče: ${url}\n`);
  }
}

main();
