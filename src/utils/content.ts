import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Cette fonction doit être utilisée uniquement côté serveur
// Nous allons l'exporter comme une fonction getStaticProps ou une API route
export function getContentLinks() {
  // Vérifier si nous sommes côté serveur
  if (typeof window === 'undefined') {
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
  return []; // Retourner un tableau vide si exécuté côté client
}

// Alternative: Créer une API route pour récupérer les liens
export async function fetchContentLinks() {
  'use server';
  
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