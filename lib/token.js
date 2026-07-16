import { SignJWT, jwtVerify } from 'jose';

/**
 * Signed tokens for email confirmation (double opt-in) and unsubscribe links.
 * Uses HS256 with a server-side secret. Reuses CRON_SECRET (already configured
 * on Vercel) unless a dedicated TOKEN_SECRET is provided — so no new env var is
 * required. Fail-closed: if no secret exists, signing throws and verification
 * returns null.
 */
function getSecret() {
  const s = process.env.TOKEN_SECRET || process.env.CRON_SECRET;
  if (!s) return null;
  return new TextEncoder().encode(s);
}

export async function signToken(payload, expiresIn = '14d') {
  const secret = getSecret();
  if (!secret) throw new Error('No signing secret configured');
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyToken(token) {
  const secret = getSecret();
  if (!secret || !token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
