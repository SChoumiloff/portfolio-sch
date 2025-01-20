"use server"

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { revalidatePath } from "next/cache";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getLinks(): Promise<ServiceResponse<any>> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    return {
      success: false,
      error: "Not authenticated"
    };
  }

  try {
    verify(token.value, JWT_SECRET);
    const links = await prisma.link.findMany({
      include: {
        views: true
      }
    });
    
    return {
      success: true,
      data: links
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid token"
    };
  }
}

interface CreateLinkInput {
  name: string;
  description: string;
  link: string;
}

export async function createLink(input: CreateLinkInput): Promise<ServiceResponse<any>> {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    return {
      success: false,
      error: "Non authentifié"
    };
  }

  try {
    verify(token.value, JWT_SECRET);

    const existingLink = await prisma.link.findUnique({
      where: { link: input.link },
    });

    if (existingLink) {
      return {
        success: false,
        error: "Ce lien est déjà utilisé"
      };
    }

    const link = await prisma.link.create({
      data: {
        id: input.link.split("?id=")[1],
        name: input.name,
        description: input.description,
        link: input.link,
      },
    });

    // Revalider la page admin pour rafraîchir les données
    revalidatePath('/admin');

    return {
      success: true,
      data: link
    };
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la création du lien"
    };
  }
} 