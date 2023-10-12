"use client";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
export default function Cart() {
  const {
    handleCartClick,
    shouldDisplayCart,
    cartCount,
    totalPrice,
    currency,
    redirectToCheckout,
    cartDetails,
    addItem,
    decrementItem,
    clearCart,
  } = useShoppingCart();
  const [status, setStatus] = useState<string | null>(null);

  const handleCheckout = async () => {
    setStatus("loading");
    const res = await fetch("/session", {
      method: "POST",
      body: JSON.stringify(cartDetails),
    });
    const data = await res.json();
    try {
      const result = await redirectToCheckout(data.sessionId);
      if (result?.error) {
        console.error(result);
        setStatus("redirect-error");
      } else {
        console.log("successss");
        setStatus("success");
        clearCart();
      }
    } catch (error) {
      console.error(error);
      setStatus("redirect-error");
    }
  };
  return (
    <>
      <button
        type="button"
        className="relative"
        onClick={() => handleCartClick()}
      >
        <span className="sr-only">Cart</span>
        <ShoppingBagIcon className="h-10 w-10 text-black" />
        <div className="absolute -right-1 bottom-6 flex h-5 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          {cartCount}
        </div>
        {/* {shouldDisplayCart ? 'cart should display' : 'cart should not display'} */}
      </button>
      <div
        className={`fixed right-0 top-0 z-10 flex h-full flex-col justify-between border-l-2 border-black bg-yellow-400 text-black transition-transform lg:w-2/5 ${
          shouldDisplayCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between">
            <h2 className="text-2xl uppercase">Your cart</h2>
            <button type="button" onClick={() => handleCartClick()}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="my-4">
            {cartCount === 0 ? (
              <p className="text-xl">
                Hmm... Nothing here? <br /> Make impact — go to the shop.
              </p>
            ) : (
              <div>
                {Object.values(cartDetails ?? {}).map((product) => (
                  <div
                    key={product.id}
                    className="my-4 flex gap-4 rounded-2xl border-2 border-black bg-white p-8 shadow-brutal"
                  >
                    <div className="flex basis-1/3 items-center justify-center p-4">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        className="-rotate-12"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex basis-2/3 flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <h3>{product.name}</h3>
                        <button className="flex h-5 w-5 items-center rounded-full bg-black p-1">
                          <span className="sr-only">remove from cart</span>
                          <XMarkIcon className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <button
                            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black"
                            type="button"
                            onClick={() =>
                              decrementItem(product.id, { count: 1 })
                            }
                          >
                            -
                          </button>
                          {product.quantity}
                          <button
                            className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-black"
                            type="button"
                            onClick={() => addItem(product, { count: 1 })}
                          >
                            +
                          </button>
                        </div>
                        <div>
                          <p>USD {(product.value / 100).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t-2 border-black p-8">
          <div className="flex">
            <div>
              <h3 className="text-xl">Subtotal</h3>
              <h4>Shipping & taxes calculated at checkout</h4>
            </div>
            <div>
              <h3 className="text-xl">
                {currency} {((totalPrice ?? 0) / 100).toFixed(2)}
              </h3>
            </div>
          </div>
          <button
            className="mt-2 w-full rounded-full bg-white p-4 shadow-brutal disabled:cursor-not-allowed disabled:text-gray-600 disabled:shadow-none"
            disabled={cartCount === 0}
            onClick={handleCheckout}
          >
            {status === "loading" ? "Creating Checkout session..." : "Checkout"}
          </button>
        </div>
      </div>
    </>
  );
}
