import { DateTime } from 'luxon';
import { prisma } from '../prisma.js';

export async function isSlotInDoctorAvailability(doctorId, startAtISO, endAtISO) {
  const start = DateTime.fromISO(startAtISO);
  const end = DateTime.fromISO(endAtISO);
  const dayOfWeek = (start.weekday % 7); // prisma stored 0..6, luxon weekday 1..7
  const avail = await prisma.doctorAvailability.findMany({ where: { doctorId: BigInt(doctorId), dayOfWeek, isActive: true } });
  if (!avail.length) return false;
  return avail.some(a => {
    const startLocal = start.setZone(a.timezone);
    const endLocal = end.setZone(a.timezone);
    const minutesStart = startLocal.hour * 60 + startLocal.minute;
    const minutesEnd = endLocal.hour * 60 + endLocal.minute;
    const durationOk = (minutesEnd - minutesStart) % a.slotMinutes === 0 && minutesEnd > minutesStart;
    const windowOk = minutesStart >= a.startMinutes && minutesEnd <= a.endMinutes;
    return durationOk && windowOk;
  });
}
