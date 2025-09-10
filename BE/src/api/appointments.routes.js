import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createAppointment, listAppointments } from '../services/appointments.service.js';

const r = Router();

r.get('/', authenticate, async (req, res, next) => {
  try {
    const data = await listAppointments(req.query, req.user);
    res.json(data);
  } catch (e) { next(e); }
});

r.post('/', authenticate, authorize(['PATIENT','ADMIN']), async (req, res, next) => {
  try {
    const body = req.body;
    // Patient can only create for self
    if (req.user.role === 'PATIENT' && body.patientId.toString() !== req.user.sub) {
      return res.status(403).json({ error: 'FORBIDDEN' });
    }
    const appt = await createAppointment(body, req.user);
    res.status(201).json(appt);
  } catch (e) { next(e); }
});

export default r;
