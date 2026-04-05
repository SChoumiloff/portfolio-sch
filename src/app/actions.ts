'use server';

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

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