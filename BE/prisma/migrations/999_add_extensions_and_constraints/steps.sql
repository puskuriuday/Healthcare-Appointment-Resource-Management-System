-- Custom migration: extensions & exclusion constraints
CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Convert email to CITEXT for case-insensitive uniqueness
ALTER TABLE "User" ALTER COLUMN "email" TYPE CITEXT;

-- Appointment no-overlap per doctor (only active statuses)
ALTER TABLE "Appointment" ADD CONSTRAINT appt_no_overlap
  EXCLUDE USING gist (
    "doctorId" WITH =,
    tstzrange("startAt", "endAt") WITH &&
  ) WHERE (status IN ('PENDING','CONFIRMED','CHECKED_IN'));

-- Bed allocation no-overlap per bed
ALTER TABLE "BedAllocation" ADD CONSTRAINT bed_no_overlap
  EXCLUDE USING gist (
    "bedId" WITH =,
    tstzrange("startAt", "endAt") WITH &&
  ) WHERE (status IN ('RESERVED','OCCUPIED'));

-- Defensive check: no negative stock
ALTER TABLE "MedicineBatch" ADD CONSTRAINT medicine_qty_nonneg CHECK ("qtyOnHand" >= 0);
