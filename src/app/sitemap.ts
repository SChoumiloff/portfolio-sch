import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

export default async function sitemap() {
  // Récupérer tous les articles du blog
  const blogs = await getBlogPosts();
  const blogUrls = blogs.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changefreq: 'weekly',
    priority: 0.8
  }));

  // Routes statiques basées sur votre navigation et structure
  const routes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `${DATA.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Routes dynamiques basées sur vos sections de page d'accueil
  const homeRoutes = [
    '#about',
    '#work',
    '#education',
    '#skills',
    '#projects',
    '#contact'
  ].map((section) => ({
    url: `${DATA.url}/${section}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...homeRoutes,
    ...blogUrls,
  ];
} 