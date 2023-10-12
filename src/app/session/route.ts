import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { cookies, headers } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { validateCartItems } from "use-shopping-cart/utilities";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data } = await supabase.from("products").select();
  const products = await request.json();
  const inventory = data!.map((item) => ({
    ...item,
    id: `${item.id}`,
    sku: `${item.id}`,
    image: item.image_url,
    currency: "USD",
  }));
  const line_items = validateCartItems(inventory, products);
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      line_items,
      success_url: `${headers().get("origin")}/?success=true`,
      cancel_url: `${headers().get("origin")}/`,
    });
  return Response.json({ sessionId: checkoutSession.id });
}
