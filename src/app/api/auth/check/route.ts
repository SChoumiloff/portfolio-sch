import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
      return new Response("Non authentifié", { status: 401 });
    }

    verify(token.value, JWT_SECRET);

    return new Response("Authentifié", { status: 200 });
  } catch (error) {
    return new Response("Token invalide", { status: 401 });
  }
} 