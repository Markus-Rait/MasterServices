import jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(
  userId: string,
  role: string,
): Promise<string> {
  const token = await new jose.SignJWT({
    sub: userId,
    role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}
