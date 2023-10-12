"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function SuccessPage() {
  const { clearCart } = useShoppingCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-yellow-400 p-8">
      <h2>
        Your order has been placed successfully. Please check your email for
        order info
      </h2>
    </main>
  );
}
