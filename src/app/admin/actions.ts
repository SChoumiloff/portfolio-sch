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

const isAuthenticated = async (): Promise<boolean> => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token");
  
    if (!token) {
      return false
    }

    verify(token.value, JWT_SECRET);
    return true
  } catch (error) {
    return false
  }
}

export async function getLinks(): Promise<ServiceResponse<any>> {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return {
      success: false,
      error: "Not authenticated"
    };
  }

  try {
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
      error: "Une erreur est survenue"
    };
  }
}

interface CreateLinkInput {
  name: string;
  description: string;
  link: string;
  company?: string | null;
  email?: string | null;
  linkedinLink?: string | null;
  phoneNumber?: string | null;
}

export async function createLink(input: CreateLinkInput): Promise<ServiceResponse<any>> {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return {
      success: false,
      error: "Non authentifié"
    };
  }

  try {
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
        company: input.company || undefined,
        email: input.email || undefined,
        linkedinLink: input.linkedinLink || undefined,
        phoneNumber: input.phoneNumber || undefined,
      },
    });

    revalidatePath('/admin');

    return {
      success: true,
      data: link
    };
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: "Erreur lors de la création du lien"
    };
  }
}

interface UpdateLinkInput {
  id: string;
  name?: string;
  description?: string;
  company?: string | null;
  email?: string | null;
  linkedinLink?: string | null;
  phoneNumber?: string | null;
}

export async function updateLink(input: UpdateLinkInput): Promise<ServiceResponse<any>> {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return {
      success: false,
      error: "Non authentifié"
    };
  }

  try {
    const existingLink = await prisma.link.findUnique({
      where: { id: input.id },
    });

    if (!existingLink) {
      return {
        success: false,
        error: "Lien introuvable"
      };
    }

    const link = await prisma.link.update({
      where: { id: input.id },
      data: {
        name: input.name ?? existingLink.name,
        description: input.description ?? existingLink.description,
        company: input.company ?? existingLink.company,
        email: input.email ?? existingLink.email,
        linkedinLink: input.linkedinLink ?? existingLink.linkedinLink,
        phoneNumber: input.phoneNumber ?? existingLink.phoneNumber,
      },
    });

    revalidatePath('/admin');

    return {
      success: true,
      data: link
    };
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la modification du lien"
    };
  }
}

export async function deleteLink(id: string): Promise<ServiceResponse<any>> {
  const isAuth = await isAuthenticated();

  if (!isAuth) {
    return {
      success: false,
      error: "Non authentifié"
    };
  }

  try {
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return {
        success: false,
        error: "Lien introuvable"
      };
    }

    await prisma.view.deleteMany({
      where: { linkId: id },
    });

    await prisma.link.delete({
      where: { id },
    });

    revalidatePath('/admin');

    return {
      success: true,
      data: null
    };
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la suppression du lien"
    };
  }
} 