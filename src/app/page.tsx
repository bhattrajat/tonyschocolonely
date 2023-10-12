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
  if (typeof searchQuery === "string" && searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }
  const { data: products } = await query;

  return (
    <main className="min-h-screen bg-yellow-400 p-8">
      <section className="flex flex-col gap-4 lg:flex-row">
        <Search />
        <Filters />
      </section>
      <section className="my-4 grid gap-4 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </section>
    </main>
  );
}
