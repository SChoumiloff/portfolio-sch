import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { calculateReadingTime } from "@/lib/utils";

export const metadata = {
  title: "Blog Tech & SaaS | Sacha Choumiloff",
  description: "Articles techniques sur le développement SaaS, retours d'expérience et bonnes pratiques de développement web moderne.",
  keywords: ["blog tech", "développement SaaS", "stack technique", "retour d'expérience"],
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Carnet de Bord</h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4 p-2 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:scale-[1.02]"
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
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.metadata.keywords?.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-accent/30 text-muted-foreground"
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
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
