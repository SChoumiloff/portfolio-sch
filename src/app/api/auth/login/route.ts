import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "your-admin-password";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ message: "Mot de passe incorrect" }), 
        { status: 401 }
      );
    }

    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 // 1 heure
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erreur serveur" }), 
      { status: 500 }
    );
  }
}