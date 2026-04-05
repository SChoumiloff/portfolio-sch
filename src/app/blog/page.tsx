import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { calculateReadingTime } from "@/lib/utils";

import { DATA } from "@/data/resume";

export const metadata = {
  title: "Blog Tech & SaaS | Sacha Choumiloff",
  description: "Articles techniques sur le développement SaaS, retours d'expérience et bonnes pratiques de développement front et back moderne.",
  keywords: ["blog tech", "développement SaaS", "stack technique", "retour d'expérience"],
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
  openGraph: {
    title: "Blog Tech & SaaS | Sacha Choumiloff",
    description: "Articles techniques sur le développement SaaS, retours d'expérience et bonnes pratiques de développement front et back moderne.",
    url: `${DATA.url}/blog`,
    type: "website",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const sortedPosts = posts.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <section className="max-w-2xl mx-auto px-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog Tech & SaaS | Sacha Choumiloff",
            url: `${DATA.url}/blog`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: sortedPosts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: post.metadata.title,
                url: `${DATA.url}/blog/${post.slug}`,
              })),
            },
          }),
        }}
      />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Carnet de Bord</h1>
      </BlurFade>
      {sortedPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4 p-2 rounded-lg transition-all duration-200 hover:bg-primary-foreground hover:scale-[1.02]"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-row items-start justify-between">
                <div className="flex flex-col">
                  <p className="tracking-tight">{post.metadata.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(post.metadata.publishedAt)}</span>
                    <span>•</span>
                    <span>{calculateReadingTime(post.source)}</span>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-2 mt-2">
                    {post.metadata.keywords?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-accent text-accent-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  width={40}
                  height={40}
                  className="hidden md:block rounded-full object-cover"
                />
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
