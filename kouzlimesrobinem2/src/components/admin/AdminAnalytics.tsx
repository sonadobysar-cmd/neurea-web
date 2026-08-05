"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AnalyticsBreakdownItem, AnalyticsDashboard } from "@/lib/analytics/types";

function Breakdown({ title, items }: { title: string; items: AnalyticsBreakdownItem[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="admin-stat-panel">
      <h3>{title}</h3>
      {items.length ? (
        <div className="admin-stat-list">
          {items.map((item) => (
            <div className="admin-stat-row" key={item.label}>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <i style={{ width: `${Math.max(5, (item.value / max) * 100)}%` }} />
            </div>
          ))}
        </div>
      ) : (
        <p className="admin-muted">Zatím bez dat.</p>
      )}
    </div>
  );
}

export function AdminAnalytics({ dashboard }: { dashboard: AnalyticsDashboard }) {
  const router = useRouter();
  const [range, setRange] = useState<7 | 30>(30);
  const period = range === 7 ? dashboard.week : dashboard.month;
  const chartMax = Math.max(...period.daily.map((point) => point.value), 1);
  const updated = new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Prague",
  }).format(new Date(dashboard.generatedAt));

  return (
    <section className="admin-section admin-analytics">
      <div className="admin-stat-head">
        <div>
          <h2>Statistiky webu</h2>
          <p className="admin-help">
            Soukromý anonymní přehled. Počítá návštěvy po 30minutových relacích, neukládá IP adresy,
            jména, kontakty ani cookies.
          </p>
        </div>
        <div className="admin-stat-actions">
          <div className="admin-range" aria-label="Období statistik">
            <button type="button" className={range === 7 ? "active" : ""} onClick={() => setRange(7)}>
              7 dní
            </button>
            <button type="button" className={range === 30 ? "active" : ""} onClick={() => setRange(30)}>
              30 dní
            </button>
          </div>
          <button type="button" className="admin-refresh" onClick={() => router.refresh()}>
            Obnovit
          </button>
        </div>
      </div>

      {dashboard.status === "unavailable" ? (
        <div className="admin-stat-empty">
          Statistiky se teď nepodařilo načíst. Web funguje dál; zkuste přehled obnovit později.
        </div>
      ) : dashboard.status === "empty" ? (
        <div className="admin-stat-empty">
          Přehled je zapnutý. První návštěva se tu objeví po nasazení a otevření veřejného webu.
        </div>
      ) : (
        <>
          <div className="admin-stat-cards">
            <article>
              <span>Návštěvy za {range} dní</span>
              <strong>{period.visits}</strong>
            </article>
            <article>
              <span>Dnes</span>
              <strong>{period.today}</strong>
            </article>
            <article>
              <span>Z odkazů a vyhledávačů</span>
              <strong>{period.referredVisits}</strong>
            </article>
            <article>
              <span>Proti minulému období</span>
              <strong className={period.trendPercent !== null && period.trendPercent < 0 ? "down" : ""}>
                {period.trendPercent === null
                  ? "Nové"
                  : `${period.trendPercent > 0 ? "+" : ""}${period.trendPercent} %`}
              </strong>
            </article>
          </div>

          <div className="admin-stat-panel admin-chart-panel">
            <h3>Návštěvy po dnech</h3>
            <div className={`admin-chart admin-chart-${range}`} role="img" aria-label="Graf návštěv po dnech">
              {period.daily.map((point, index) => (
                <div className="admin-chart-column" key={point.date} title={`${point.label}: ${point.value}`}>
                  <span>{point.value || ""}</span>
                  <i style={{ height: `${Math.max(point.value ? 8 : 2, (point.value / chartMax) * 100)}%` }} />
                  <small>{range === 7 || index % 5 === 0 || index === period.daily.length - 1 ? point.label : ""}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-stat-grid">
            <Breakdown title="Odkud přišli" items={period.sources} />
            <Breakdown title="Vstupní stránky" items={period.landingPages} />
            <Breakdown title="Země" items={period.countries} />
            <Breakdown title="Zařízení" items={period.devices} />
            <Breakdown title="Prohlížeče" items={period.browsers} />
          </div>
        </>
      )}

      <p className="admin-stat-updated">Naposledy načteno {updated}</p>
    </section>
  );
}
