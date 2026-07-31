import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, blogs } from "@/lib/site-data";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const paragraphs = blog.body
    .replace(/\\n/g, "\n")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="border-b border-black/10 bg-[var(--color-warm-white)]">
        <div className="container-shell py-6 text-sm uppercase tracking-[0.14em] text-[var(--color-mid)]">
          <Link href="/" className="hover:text-[var(--color-black)]">Home</Link>
          <span className="px-3">/</span>
          <Link href="/blogs" className="hover:text-[var(--color-black)]">Blogs</Link>
        </div>
      </section>

      <article className="section-space">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow">
            {blog.publishedAt} · {blog.author}
          </p>
          <h1 className="font-heading mt-4 text-4xl leading-tight md:text-6xl">
            {blog.title}
          </h1>
          <div className="mt-10 overflow-hidden border border-black/10">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={720}
              className="h-[420px] w-full object-cover"
              priority
            />
          </div>
          <div className="body-copy mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-14 border-t border-black/10 pt-8">
            <Link
              href="/blogs"
              className="text-sm uppercase tracking-[0.14em] text-[var(--color-gold)]"
            >
              ← All articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
