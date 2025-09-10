import { decode, sign, verify } from "azion/jwt";

const SECRET = process.env.SECRET || 'default-secret-key';
const USER = process.env.USER_EMAIL || 'admin@honeypot.com';
const PASSWORD = process.env.USER_PASSWORD || 'admin123';

export async function generateToken() {
  const inPayload = {
    sub: USER,
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token expires in 24 hours
  };
  const token = await sign(inPayload, SECRET);
  return token;
}

export async function decodeJwt(token: string) {
  await verify(token, SECRET);
  const { header, payload } = decode(token);
  return { header, payload };
}

export async function validateLogin(user: string, password: string): Promise<boolean> {
  return user === USER && password === PASSWORD;
}

export { USER, PASSWORD };
