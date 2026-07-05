#!/usr/bin/env node
/**
 * Otevře běžící Next.js dev server na /robin (Kouzlíme s Robinem).
 */
import { execSync } from "node:child_process";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";

const ports = [3000, 3001, 3002, 3003, 3004, 3005];
const hosts = ["127.0.0.1", "localhost"];
const path = "/robin";

function checkRobin(hostname, port) {
  return new Promise((resolve) => {
    const req = http.request(
      { hostname, port, path, method: "GET", timeout: 2500 },
      (res) => {
        res.resume();
        resolve(res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode < 400);
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

async function main() {
  for (let i = 0; i < 80; i++) {
    for (const port of ports) {
      for (const host of hosts) {
        if (await checkRobin(host, port)) {
          const url = `http://${host}:${port}${path}`;
          execSync(`open "${url}"`, { stdio: "inherit" });
          console.log(`\n  Otevřeno: ${url}\n`);
          return;
        }
      }
    }
    await delay(500);
  }
  console.error("\n❌ Dev server neběží. Spusť: npm run dev\n   Pak znovu klikni na OTEVRI-ROBIN.command\n");
  process.exit(1);
}

main();
