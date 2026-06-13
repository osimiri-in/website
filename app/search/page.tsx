import { PageHero } from "@/components/ui/PageHero";
import { collections, projects } from "@/lib/site-data";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = (params.q || "").toLowerCase();
  const productResults = collections.filter((item) => item.name.toLowerCase().includes(query));
  const projectResults = projects.filter((item) => item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));

  return (
    <>
      <PageHero label="Search" title="Find products and projects." description={`Results for: ${params.q || ""}`} />
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Products</p>
            <div className="mt-6 space-y-4">
              {productResults.length ? productResults.map((item) => <div key={item.slug} className="card-surface p-6"><h2 className="font-heading text-2xl">{item.name}</h2><p className="body-copy mt-3">{item.descriptor}</p></div>) : <p className="body-copy">No product matches yet.</p>}
            </div>
          </div>
          <div>
            <p className="eyebrow">Projects</p>
            <div className="mt-6 space-y-4">
              {projectResults.length ? projectResults.map((item) => <div key={item.slug} className="card-surface p-6"><h2 className="font-heading text-2xl">{item.title}</h2><p className="body-copy mt-3">{item.location} · {item.type}</p></div>) : <p className="body-copy">No project matches yet.</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
