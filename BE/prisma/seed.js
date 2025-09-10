import { prisma } from '../src/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  const adminPass = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.local' },
    update: {},
    create: { email: 'admin@demo.local', passwordHash: adminPass, role: 'ADMIN' }
  });

  const docPass = await bcrypt.hash('Doctor123!', 10);
  const doctor = await prisma.user.create({ data: { email: 'doctor@demo.local', passwordHash: docPass, role: 'DOCTOR' } });
  await prisma.doctorProfile.create({ data: { userId: doctor.id, fullName: 'Dr. Demo', specialty: 'General', roomNumber: 'A-1' } });
  await prisma.doctorAvailability.createMany({ data: [
    { doctorId: doctor.id, dayOfWeek: 1, startMinutes: 9*60, endMinutes: 17*60, slotMinutes: 15, timezone: 'UTC' },
    { doctorId: doctor.id, dayOfWeek: 2, startMinutes: 9*60, endMinutes: 17*60, slotMinutes: 15, timezone: 'UTC' }
  ]});

  const patPass = await bcrypt.hash('Patient123!', 10);
  const patient = await prisma.user.create({ data: { email: 'patient@demo.local', passwordHash: patPass, role: 'PATIENT' } });
  await prisma.patientProfile.create({ data: { userId: patient.id, fullName: 'Patient Demo' } });

  console.log({ admin: admin.id, doctor: doctor.id, patient: patient.id });
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => prisma.$disconnect());
