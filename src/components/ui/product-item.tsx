"use client";
import { Database } from "@/types/supabase";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

type Props = {
  product: Database["public"]["Tables"]["products"]["Row"];
  priority: boolean;
};
export default function ProductItem({ product, priority }: Props) {
  const { addItem } = useShoppingCart();
  return (
    <div className="group h-full rounded-2xl border-2 border-black bg-white p-8 uppercase text-black shadow-brutal">
      <h2 className="text-xl">{product.name}</h2>
      <div className="flex h-80 items-center justify-center lg:h-[500px]">
        <Image
          src={product.image_url}
          className="h-auto w-auto -rotate-45 group-hover:rotate-0"
          width={400}
          height={400}
          priority={priority}
          alt={product.name}
        />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-xl">USD {(product.price / 100).toFixed(2)}</h3>
          <h4 className="lowercase">
            {product.weight} oz, {product.bars}{" "}
            {product.bars > 1 ? "bars" : "bar"}
          </h4>
        </div>
        <button
          type="button"
          onClick={() =>
            addItem(
              {
                ...product,
                id: `${product.id}`,
                image: product.image_url,
                currency: "USD",
              },
              { count: 1 },
            )
          }
          className="group/button flex h-[108px] w-[108px] items-center justify-center rounded-full border-2 border-black p-1 hover:bg-black"
        >
          <svg
            viewBox="0 0 90 90"
            fill="white"
            width={90}
            height={90}
            className="text-sm tracking-tight group-hover/button:fill-black"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <path
              d="
                M (CENTER_X - RADIUS),CENTER_Y
                a RADIUS,RADIUS 0 1,1 (2 * RADIUS),0
                RADIUS,RADIUS 0 1,1 (-2 * RADIUS),0
              "
            /> */}
            <path
              id="circlePath"
              d="
                M 10, 45
                a 35,35 0 1,1 70,0
                35,35 0 1,1 -70,0
              "
            />
            <text>
              <textPath
                fill="black"
                className="group-hover/button:fill-white"
                href="#circlePath"
                textLength={Math.floor(Math.PI * 2 * 34)}
              >
                add to cart&bull;add to cart&bull;
              </textPath>
            </text>
          </svg>
          <ShoppingBagIcon className="absolute h-8 w-8 text-black group-hover/button:text-white" />
        </button>
      </div>
    </div>
  );
}
