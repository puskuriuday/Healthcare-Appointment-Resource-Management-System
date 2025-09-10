import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';

export function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'UNAUTHENTICATED' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'INVALID_TOKEN' });
  }
}

export function authorize(roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'UNAUTHENTICATED' });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'FORBIDDEN' });
    }
    next();
  };
}

export async function issueTokens(user) {
  const access = jwt.sign({ sub: user.id.toString(), role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '20m' });
  const refreshRaw = crypto.randomUUID();
  const refreshHash = await import('node:crypto').then(c => c.createHash('sha256').update(refreshRaw).digest('hex'));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash: refreshHash, expiresAt } });
  return { access, refresh: refreshRaw };
}

export async function rotateRefresh(refreshRaw) {
  const hash = await import('node:crypto').then(c => c.createHash('sha256').update(refreshRaw).digest('hex'));
  const token = await prisma.refreshToken.findFirst({ where: { tokenHash: hash, revokedAt: null, expiresAt: { gt: new Date() } }, include: { user: true } });
  if (!token) throw new Error('INVALID_REFRESH');
  // revoke old
  await prisma.refreshToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
  return issueTokens(token.user);
}
