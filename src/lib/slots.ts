import { isSlotAvailable } from "@/lib/bookingStore";

const SLOT_STEP_MIN = 15;

function getDaySchedule(isoDate: string) {
  const day = new Date(`${isoDate}T00:00:00`).getDay();
  // 0 = neděle, 6 = sobota
  if (day === 0 || day === 6) return null;

  // Jedna agenda / jeden terapeut.
  // Rezervace držíme v pracovních hodinách 9:00-19:00.
  return { start: "09:00", end: "19:00" };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHhmm(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export async function getAvailableSlotsForDate(date: string, durationMin: number) {
  const schedule = getDaySchedule(date);
  if (!schedule) return [];

  const startMin = toMinutes(schedule.start);
  const endMin = toMinutes(schedule.end);

  const results: string[] = [];
  for (let t = startMin; t + durationMin <= endMin; t += SLOT_STEP_MIN) {
    const hhmm = toHhmm(t);
    // eslint-disable-next-line no-await-in-loop
    const available = await isSlotAvailable(date, hhmm, durationMin);
    if (available) results.push(hhmm);
  }
  return results;
}

