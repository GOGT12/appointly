CREATE TABLE "business_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"logo_url" text,
	"primary_color" text DEFAULT '#000000' NOT NULL,
	"timezone" text DEFAULT 'America/La_Paz' NOT NULL,
	"qr_image_url" text,
	"open_days" text[] DEFAULT '{"mon","tue","wed","thu","fri","sat"}' NOT NULL,
	"open_time" time DEFAULT '09:00' NOT NULL,
	"close_time" time DEFAULT '18:00' NOT NULL,
	"min_booking_notice_hours" integer DEFAULT 3 NOT NULL,
	"singleton" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "business_settings_singleton_unique" UNIQUE("singleton")
);
