'use server';

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { prisma } from "@/lib/prisma"

export async function fetchContentLinks() {
  const contentDir = join(process.cwd(), 'content');
  const files = readdirSync(contentDir);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = join(contentDir, file);
      const content = readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      const slug = file.replace('.mdx', '');
      
      return {
        value: `/blog/${slug}`,
        label: data.title
      };
    });
}

export async function recordView(linkId: string, link: string) {
  try {
    console.log("localhost:3000/blog/skip-introduction?id=lYA7Z")
    await prisma.view.create({
      data: {
        link: { connect: { id: linkId } },
        date: new Date(),
      },
    })
    
    return {
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: "Erreur lors de l'enregistrement de la vue"
    }
  }
} 