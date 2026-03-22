#!/usr/bin/env node
/**
 * Počká na běžící Next.js dev server a otevře ho v výchozím prohlížeči (macOS: `open`).
 * Zkouší porty 3000–3005 a hosty 127.0.0.1 / localhost.
 * Používá nativní `http` (spolehlivější než `fetch` na některých Node / síťových nastaveních).
 */
import { execSync } from "node:child_process";
import http from "node:http";
import { setTimeout as delay } from "node:timers/promises";

const ports = [3000, 3001, 3002, 3003, 3004, 3005];
const hosts = ["127.0.0.1", "localhost"];

function checkServer(hostname, port) {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname,
        port,
        path: "/",
        method: "GET",
        timeout: 2500,
      },
      (res) => {
        res.resume();
        resolve(res.statusCode !== undefined && res.statusCode < 500);
      }
    );
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function tryUrl(hostLabel, port) {
  const ok = await checkServer(hostLabel, port);
  if (!ok) return null;
  const protocol = "http";
  return `${protocol}://${hostLabel}:${port}`;
}

async function main() {
  const maxAttempts = 80;
  for (let i = 0; i < maxAttempts; i++) {
    for (const port of ports) {
      for (const host of hosts) {
        const url = await tryUrl(host, port);
        if (url) {
          try {
            execSync(`open "${url}"`, { stdio: "inherit" });
            console.log(`\n  Otevřeno: ${url}\n`);
            return;
          } catch {
            console.error("Nepodařilo se spustit příkaz open. Otevřete ručně:", url);
            process.exit(1);
          }
        }
      }
    }
    await delay(500);
  }
  console.error("");
  console.error("❌ Nepodařilo se připojit k dev serveru (zkoušeno 127.0.0.1 a localhost, porty 3000–3005).");
  console.error("");
  console.error("Zkontrolujte:");
  console.error("  1) V jiném terminálu běží:  npm run dev");
  console.error("  2) Počkejte na řádek „Ready“ — případně otevřete URL z řádku „Local:“ ručně.");
  console.error("");
  process.exit(1);
}

main();
