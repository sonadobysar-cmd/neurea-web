"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ServiceType } from "@/data/pricing";
import type { DayKey } from "@/data/providers";

export type UserRole = "mom" | "caregiver";

export type BookingRecord = {
  id: string;
  providerId: string;
  providerName: string;
  service: ServiceType;
  date: string;
  start: string;
  end: string;
  hours: number;
  total: number;
  createdAt: string;
  status: "confirmed" | "completed" | "cancelled";
};

export type MomProfile = {
  role: "mom";
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  babyAgeMonths?: number;
  createdAt: string;
  bookings: BookingRecord[];
};

export type CaregiverDraft = {
  role: "caregiver";
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ico: string;
  services: ServiceType[];
  experiences: string[];
  bio: string;
  radiusKm: number;
  weeklySlots: Partial<Record<DayKey, string[]>>;
  slotHours: number;
  lactationLevel?: "pa" | "laicka";
  status: "draft" | "pending_review" | "verified";
  createdAt: string;
};

export type AuthUser = MomProfile | CaregiverDraft;

type AuthContextValue = {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  registerMom: (data: {
    name: string;
    email: string;
    password: string;
    city?: string;
    phone?: string;
  }) => { ok: true } | { ok: false; error: string };
  registerCaregiver: (
    data: Omit<CaregiverDraft, "id" | "role" | "createdAt" | "status"> & { password: string }
  ) => { ok: true } | { ok: false; error: string };
  updateCaregiver: (patch: Partial<CaregiverDraft>) => void;
  addBooking: (booking: Omit<BookingRecord, "id" | "createdAt" | "status">) => void;
  logout: () => void;
};

const STORAGE_USERS = "mamasos.users.v1";
const STORAGE_SESSION = "mamasos.session.v1";

type StoredUser = AuthUser & { password: string };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function stripPassword(u: StoredUser): AuthUser {
  const { password: _, ...rest } = u;
  return rest;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sessionEmail = localStorage.getItem(STORAGE_SESSION);
    if (sessionEmail) {
      const found = readUsers().find((u) => u.email === sessionEmail);
      if (found) setUser(stripPassword(found));
    }
    setReady(true);
  }, []);

  const persistSession = useCallback((email: string, next: AuthUser) => {
    localStorage.setItem(STORAGE_SESSION, email);
    setUser(next);
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const found = readUsers().find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (!found || found.password !== password) {
        return { ok: false as const, error: "Špatný e-mail nebo heslo." };
      }
      persistSession(found.email, stripPassword(found));
      return { ok: true as const };
    },
    [persistSession]
  );

  const registerMom = useCallback(
    (data: {
      name: string;
      email: string;
      password: string;
      city?: string;
      phone?: string;
    }) => {
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
        return { ok: false as const, error: "Účet s tímto e-mailem už existuje." };
      }
      const next: StoredUser = {
        role: "mom",
        id: `mom-${Date.now()}`,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim(),
        city: data.city,
        createdAt: new Date().toISOString(),
        bookings: [],
        password: data.password,
      };
      writeUsers([...users, next]);
      persistSession(next.email, stripPassword(next));
      return { ok: true as const };
    },
    [persistSession]
  );

  const registerCaregiver = useCallback(
    (
      data: Omit<CaregiverDraft, "id" | "role" | "createdAt" | "status"> & {
        password: string;
      }
    ) => {
      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
        return { ok: false as const, error: "Účet s tímto e-mailem už existuje." };
      }
      const { password, ...profile } = data;
      const next: StoredUser = {
        ...profile,
        role: "caregiver",
        id: `cg-${Date.now()}`,
        email: data.email.trim().toLowerCase(),
        status: "pending_review",
        createdAt: new Date().toISOString(),
        password,
      };
      writeUsers([...users, next]);
      persistSession(next.email, stripPassword(next));
      return { ok: true as const };
    },
    [persistSession]
  );

  const updateCaregiver = useCallback((patch: Partial<CaregiverDraft>) => {
    setUser((prev) => {
      if (!prev || prev.role !== "caregiver") return prev;
      const updated: CaregiverDraft = { ...prev, ...patch };
      const users: StoredUser[] = readUsers().map((u) => {
        if (u.email !== prev.email || u.role !== "caregiver") return u;
        return { ...u, ...patch };
      });
      writeUsers(users);
      return updated;
    });
  }, []);

  const addBooking = useCallback(
    (booking: Omit<BookingRecord, "id" | "createdAt" | "status">) => {
      setUser((prev) => {
        if (!prev || prev.role !== "mom") return prev;
        const record: BookingRecord = {
          ...booking,
          id: `bk-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: "confirmed",
        };
        const updated: MomProfile = {
          ...prev,
          bookings: [record, ...prev.bookings],
        };
        const users: StoredUser[] = readUsers().map((u) => {
          if (u.email !== prev.email || u.role !== "mom") return u;
          return { ...u, bookings: updated.bookings };
        });
        writeUsers(users);
        return updated;
      });
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_SESSION);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      login,
      registerMom,
      registerCaregiver,
      updateCaregiver,
      addBooking,
      logout,
    }),
    [
      user,
      ready,
      login,
      registerMom,
      registerCaregiver,
      updateCaregiver,
      addBooking,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
