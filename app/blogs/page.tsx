import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { blogs } from "@/lib/site-data";

export default function BlogsPage() {
  return (
    <>
      <PageHero label="Blogs" title="Ideas, process notes, and specification insights." description="Articles for homeowners, architects, and interior designers planning custom luxury furniture." image={blogs[0].coverImage} />
      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.slug} className="card-surface overflow-hidden">
              <Image src={blog.coverImage} alt={blog.title} width={900} height={620} className="h-[300px] w-full object-cover" />
              <div className="p-6">
                <p className="eyebrow">{blog.publishedAt}</p>
                <h2 className="font-heading mt-3 text-3xl">{blog.title}</h2>
                <p className="body-copy mt-3">{blog.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
