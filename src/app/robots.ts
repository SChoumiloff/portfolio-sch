
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {


    const posts = await getBlogPosts();
    const blogPaths = posts.map(post => `/blog/${post.slug}`);
    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/blog',
                    ...blogPaths,
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/_next/',
                    '/static/',
                ],
            },
        ],
        sitemap: `${DATA.url}/sitemap.xml`,
        host: DATA.url,
    }
}