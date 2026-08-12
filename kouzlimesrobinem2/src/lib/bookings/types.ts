export type BookingStatus = "pending" | "approved" | "declined" | "cancelled";
export type CalendarEntryType = "booking" | "block";

export type CalendarEntry = {
  id: string;
  entryType: CalendarEntryType;
  status: BookingStatus;
  startAt: string;
  endAt: string;
  title: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  eventType: string | null;
  location: string | null;
  guestCount: number | null;
  message: string | null;
  adminNote: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  notificationSentAt: string | null;
};

export type BookingDashboard = {
  configured: boolean;
  pendingCount: number;
  entries: CalendarEntry[];
  error?: string;
};
