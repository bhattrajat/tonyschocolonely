"use client";

import Link from "next/link";
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
    <main className="flex min-h-screen justify-center bg-yellow-400 p-8 text-2xl text-black">
      <div className="h-48 rounded-2xl border-2 border-black bg-white p-4 shadow-brutal">
        <h2 className="my-4">
          Your order has been placed successfully. <br /> Please check your
          email for order info
        </h2>
        <Link className="underline" href="/">
          Click here
        </Link>
        to place another order
      </div>
    </main>
  );
}
