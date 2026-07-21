#!/usr/bin/env python3
"""Sync kouzlimesrobinem2-work/body.html -> src/lib/luxuryBody.ts (CMS template)."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BODY = ROOT / "kouzlimesrobinem2-work" / "body.html"
OUT = ROOT / "kouzlimesrobinem2" / "src" / "lib" / "luxuryBody.ts"


def main() -> None:
    if not BODY.exists():
        raise SystemExit(f"Missing {BODY}")

    html = BODY.read_text(encoding="utf-8").strip()
    escaped = html.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    ts = f'export const luxuryBodyTemplate = `{escaped}`;\n'
    OUT.write_text(ts, encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
