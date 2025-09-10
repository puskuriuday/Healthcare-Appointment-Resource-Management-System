import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { issueTokens, rotateRefresh, authenticate } from '../middleware/auth.js';

const r = Router();

r.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'EMAIL_TAKEN' });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, passwordHash: hash, role: 'PATIENT' } });
    const tokens = await issueTokens(user);
    res.status(201).json({ user: { id: user.id.toString(), role: user.role, email: user.email }, ...tokens });
  } catch (e) { next(e); }
});

r.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    const tokens = await issueTokens(user);
    res.json({ user: { id: user.id.toString(), role: user.role, email: user.email }, ...tokens });
  } catch (e) { next(e); }
});

r.post('/refresh', async (req, res, next) => {
  try {
    const { refresh } = req.body;
    const tokens = await rotateRefresh(refresh);
    res.json(tokens);
  } catch (e) { next(e); }
});

r.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: { id: BigInt(req.user.sub) },
      select: { id: true, email: true, role: true, status: true }
    });
    if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
    res.json({ id: user.id.toString(), email: user.email, role: user.role, status: user.status });
  } catch (e) { next(e); }
});

export default r;
