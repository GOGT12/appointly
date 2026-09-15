import { pgTable, uuid, text, boolean, timestamp, time, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("owner"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const businessSettings = pgTable("business_settings", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").notNull().default("#000000"),
  timezone: text("timezone").notNull().default("America/La_Paz"),
  qrImageUrl: text("qr_image_url"),

  openDays: text("open_days").array().notNull().default(["mon","tue","wed","thu","fri","sat"]),
  openTime: time("open_time").notNull().default("09:00"),
  closeTime: time("close_time").notNull().default("18:00"),

  minBookingNoticeHours: integer("min_booking_notice_hours").notNull().default(3),

  singleton: boolean("singleton").notNull().default(true).unique(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
