import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Filters from "@/components/ui/filters";
import ProductItem from "@/components/ui/product-item";
import Search from "@/components/ui/search";
import { Database } from "@/types/supabase";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let query = supabase.from("products").select();
  const searchQuery = searchParams["search"];
  const sortBy = searchParams["sortBy"];
  const categories = searchParams["category"];
  if (typeof searchQuery === "string" && searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }
  if (typeof sortBy === "string" && sortBy) {
    if (sortBy === "priceAsc") {
      query = query.order("price", { ascending: true });
    } else {
      query = query.order("price", { ascending: false });
    }
  }
  if (categories && categories.length > 0) {
    query = query.contains(
      "categories",
      Array.isArray(categories) ? categories : [categories],
    );
  }
  const { data: products } = await query;

  return (
    <main className="min-h-screen bg-yellow-400 p-8">
      <section className="relative flex flex-col gap-4 lg:flex-row">
        <Search />
        <Filters />
      </section>
      {!products ||
        (products.length === 0 && (
          <p className="my-8 text-center text-2xl text-black">
            Hmm, we couldn&apos;t find any products. Try changing your filters.
          </p>
        ))}
      <section className="my-6 grid gap-4 lg:grid-cols-3">
        {products?.map((product, idx) => (
          <ProductItem product={product} key={product.id} priority={idx < 3} />
        ))}
      </section>
    </main>
  );
}
