import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from 'next/link';
import { ShareButtons } from "@/components/ShareButtons";
import { SubArticleCard } from "@/components/sub-article-card";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    keywords,
    keywordsSEO,
  } = post.metadata;
  
  let ogImage = image 
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title: `${title} | Blog Tech Sacha Choumiloff`,
    description,
    keywords: keywordsSEO,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [{ 
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }],
      authors: [DATA.name],
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  // Récupérer tous les articles et les trier par date
  const allPosts = await getBlogPosts();
  const recentPosts = allPosts
    .sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )
    .filter(p => p.slug !== params.slug) // Exclure l'article courant
    .slice(0, 4); // Prendre les 4 premiers

  const readingTime = calculateReadingTime(post.source);

  return (
    <section id="blog">
      <div className="flex align-middle items-center justify-between">
        <Link 
          href="/blog"
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 block"
        >
          ← Retour à la liste des articles
        </Link>
        <div className="mt-1">
          <ShareButtons 
            url={`${DATA.url}/blog/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.descriptionSocials}
          />
        </div>
      </div>
      
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <Suspense fallback={<p className="h-5" />}>
            <span>{formatDate(post.metadata.publishedAt)}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </Suspense>
        </div>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
      
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Articles récents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post) => {
            if (post.slug !== params.slug) {  
              return (
                <SubArticleCard
                  key={post.slug}
                  title={post.metadata.title}
                  description={post.metadata.summary}
                  tags={post.metadata.keywords || []}
                readingTime={calculateReadingTime(post.source)}
                image={post.metadata.image || "/placeholder.svg"}
                slug={post.slug}
              />
            )
          }
          })}
        </div>
      </div>
    </section>
  );
}
