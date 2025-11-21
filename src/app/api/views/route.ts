import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID manquant" }, { status: 400 });
    }

    const view = await prisma.view.create({
      data: {
        link: { connect: { id } },
        date: new Date(),
      },
    });

    return Response.json({ success: true, data: view });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la vue:", error);
    return Response.json(
      { error: "Erreur lors de l'enregistrement de la vue" },
      { status: 500 }
    );
  }
} 