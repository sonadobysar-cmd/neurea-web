/* Early-bird countdown — ~8 days from first load, persisted in localStorage */
(function () {
  const KEY = "brc-earlybird-deadline";
  const root = document.getElementById("countdown");
  if (!root) return;

  let deadline = Number(localStorage.getItem(KEY));
  if (!deadline || Number.isNaN(deadline) || deadline < Date.now()) {
    deadline = Date.now() + 8 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000;
    localStorage.setItem(KEY, String(deadline));
  }

  const els = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    mins: root.querySelector('[data-unit="mins"]'),
    secs: root.querySelector('[data-unit="secs"]'),
  };

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function tick() {
    const diff = Math.max(0, deadline - Date.now());
    const s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.mins.textContent = pad(mins);
    els.secs.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
