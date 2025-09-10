# Lumen Backend (Express + Prisma, JavaScript)

Minimal MVP scaffolding: auth, appointments creation/list with availability validation and DB-level exclusion constraints.

## Quick Start

1. Copy env
```
cp .env.example .env
```
2. Start Postgres & Redis (e.g., Docker) then install deps
```
npm install
```
3. Migrate & generate Prisma client
```
npx prisma migrate dev --name init
# apply custom constraints migration
# (after first migrate creates tables)
# place already created 999 migration at end
npx prisma migrate dev --name add_extensions_and_constraints
```
4. Seed
```
npm run seed
```
5. Run
```
npm run dev
```

## Auth
POST /api/v1/auth/register { email, password }
POST /api/v1/auth/login { email, password }

## Appointments
GET /api/v1/appointments (auth required)
POST /api/v1/appointments { patientId, doctorId, startAt, endAt, reason }

Errors map to business codes (e.g., APPT_OUT_OF_SCHEDULE, APPT_SLOT_TAKEN).

Extend with additional routes (beds, medicines, billing, notifications) following the original LLD.
