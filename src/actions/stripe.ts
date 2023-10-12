"use server";

import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

// import { CURRENCY } from "@/config";
// import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";
import { CartDetails } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";

export async function createCheckoutSession(
  cartDetails: CartDetails,
): Promise<void> {
  console.log("here");
  console.log(cartDetails);
  // const checkoutSession: Stripe.Checkout.Session =
  //   await stripe.checkout.sessions.create({
  //     mode: "payment",
  //     submit_type: "pay",
  //     line_items: [
  //       {
  //         quantity: 1,
  //         price_data: {
  //           currency: "USD",
  //           product_data: {
  //             name: "Custom amount donation",
  //           },
  //           unit_amount: formatAmountForStripe(
  //             Number(data.get("customDonation") as string),
  //             CURRENCY,
  //           ),
  //         },
  //       },
  //     ],
  //     success_url: `${headers().get(
  //       "origin",
  //     )}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${headers().get("origin")}/`,
  //   });

  // redirect(checkoutSession.url as string);
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: "USD",
    });

  return { client_secret: paymentIntent.client_secret as string };
}
