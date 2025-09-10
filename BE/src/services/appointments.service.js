import { prisma } from '../prisma.js';
import { isSlotInDoctorAvailability } from './availability.service.js';

export async function createAppointment(dto, actor) {
  const ok = await isSlotInDoctorAvailability(dto.doctorId, dto.startAt, dto.endAt);
  if (!ok) throw new Error('APPT_OUT_OF_SCHEDULE');

  const overlappingTimeOff = await prisma.doctorTimeOff.findFirst({
    where: { doctorId: BigInt(dto.doctorId), startAt: { lt: new Date(dto.endAt) }, endAt: { gt: new Date(dto.startAt) } }
  });
  if (overlappingTimeOff) throw new Error('APPT_IN_TIMEOFF');

  try {
    const appt = await prisma.$transaction(async (tx) => {
      const created = await tx.appointment.create({
        data: {
          patientId: BigInt(dto.patientId),
          doctorId: BigInt(dto.doctorId),
          startAt: new Date(dto.startAt),
          endAt: new Date(dto.endAt),
          status: 'CONFIRMED',
          reason: dto.reason,
            location: dto.location,
          createdById: BigInt(actor.id)
        }
      });
      await tx.notification.createMany({ data: [
        { recipientUserId: BigInt(dto.patientId), channel: 'EMAIL', templateCode: 'APPT_REMINDER_24H', payload: { appointmentId: created.id }, scheduledFor: new Date(new Date(dto.startAt).getTime() - 24*3600*1000) },
        { recipientUserId: BigInt(dto.patientId), channel: 'SMS', templateCode: 'APPT_REMINDER_2H', payload: { appointmentId: created.id }, scheduledFor: new Date(new Date(dto.startAt).getTime() - 2*3600*1000) }
      ] });
      return created;
    });
    return appt;
  } catch (e) {
    if (e.message && e.message.includes('appt_no_overlap')) throw new Error('APPT_SLOT_TAKEN');
    throw e;
  }
}

export async function listAppointments(filter, actor) {
  const where = {};
  if (filter.doctorId) where.doctorId = BigInt(filter.doctorId);
  if (filter.patientId) where.patientId = BigInt(filter.patientId);
  if (filter.status) where.status = filter.status;
  if (filter.from || filter.to) {
    where.startAt = {};
    if (filter.from) where.startAt.gte = new Date(filter.from);
    if (filter.to) where.startAt.lte = new Date(filter.to);
  }
  // Ownership restrictions
  if (actor.role === 'PATIENT') where.patientId = BigInt(actor.sub);
  if (actor.role === 'DOCTOR') where.doctorId = BigInt(actor.sub);
  return prisma.appointment.findMany({ where, orderBy: { startAt: 'asc' }, take: 100 });
}
