export type AnalyticsBreakdownItem = {
  label: string;
  value: number;
};

export type AnalyticsDailyPoint = {
  date: string;
  label: string;
  value: number;
};

export type AnalyticsPeriod = {
  days: 7 | 30;
  visits: number;
  today: number;
  referredVisits: number;
  trendPercent: number | null;
  daily: AnalyticsDailyPoint[];
  landingPages: AnalyticsBreakdownItem[];
  sources: AnalyticsBreakdownItem[];
  countries: AnalyticsBreakdownItem[];
  devices: AnalyticsBreakdownItem[];
  browsers: AnalyticsBreakdownItem[];
};

export type AnalyticsDashboard = {
  status: "ready" | "empty" | "unavailable";
  generatedAt: string;
  week: AnalyticsPeriod;
  month: AnalyticsPeriod;
};
