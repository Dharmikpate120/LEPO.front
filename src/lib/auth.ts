import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function decodeJWT(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is not defined');
  }

  const token = await getToken({ req, secret });
  return token;
}