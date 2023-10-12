"use client";

import { CartProvider } from "use-shopping-cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider
      shouldPersist={true}
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
      currency="USD"
    >
      {children}
    </CartProvider>
  );
}
