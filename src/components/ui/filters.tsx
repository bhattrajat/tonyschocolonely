"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useClickAway } from "@uidotdev/usehooks";
import { clsx } from "clsx";

export default function Filters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filtersRef = useClickAway<HTMLDivElement>(() => {
    setIsFilterOpen(false);
  });
  const setSorting = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    router.push(pathname + "?" + params.toString());
  };
  const toggleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.getAll("category").includes(value)) {
      params.delete("category", value);
    } else {
      params.append("category", value);
    }
    router.push(pathname + "?" + params.toString());
  };
  const categories = searchParams.getAll("category");
  return (
    <>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="rounded-full border-2 border-black bg-orange-500 p-2.5 px-8 py-4 font-bold uppercase text-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        Filters and Sorting
      </button>
      {isFilterOpen && (
        <div
          ref={filtersRef}
          className="absolute left-0 right-0 top-full z-10 mt-2 flex justify-between rounded-3xl border-2 border-black bg-yellow-400 p-4 uppercase text-black lg:px-8"
        >
          <div>
            <h2 className="text-2xl">Filters</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <div>
                <input
                  id="small-bars"
                  type="checkbox"
                  className={"h-8 w-8 bg-orange-500 stroke-black text-black"}
                  checked={searchParams
                    .getAll("category")
                    .includes("small-bars")}
                  onChange={() => toggleCategory("small-bars")}
                />
                <label className="ml-2" htmlFor="small-bars">
                  Small bars
                </label>
              </div>
              <div>
                <input
                  id="big-bars"
                  type="checkbox"
                  className={"h-8 w-8 bg-orange-500 stroke-black text-black "}
                  checked={searchParams.getAll("category").includes("big-bars")}
                  onChange={() => toggleCategory("big-bars")}
                />
                <label className="ml-2" htmlFor="big-bars">
                  Big bars
                </label>
              </div>
              <div>
                <input
                  id="milk-chocolate"
                  type="checkbox"
                  className={"h-8 w-8 bg-orange-500 stroke-black text-black "}
                  checked={searchParams
                    .getAll("category")
                    .includes("milk-chocolate")}
                  onChange={() => toggleCategory("milk-chocolate")}
                />
                <label className="ml-2" htmlFor="milk-chocolate">
                  Milk chocolate
                </label>
              </div>
              <div>
                <input
                  id="milk-chocolate"
                  type="checkbox"
                  className={"h-8 w-8 bg-orange-500 stroke-black text-black"}
                  checked={searchParams
                    .getAll("category")
                    .includes("dark-chocolate")}
                  onChange={() => toggleCategory("dark-chocolate")}
                />
                <label className="ml-2" htmlFor="dark-chocolate">
                  Dark chocolate
                </label>
              </div>
            </div>
          </div>
          <div>
            <RadioGroup
              value={searchParams.get("sortBy") ?? ""}
              onChange={setSorting}
              className="flex flex-col items-start gap-4 uppercase"
            >
              <RadioGroup.Label className="text-2xl uppercase">
                Sorting
              </RadioGroup.Label>
              <RadioGroup.Option value="">
                {({ checked }) => (
                  <div
                    className={`cursor-pointer rounded-full p-4 ${
                      checked
                        ? "bg-black text-white"
                        : "border-2 border-black bg-orange-600 text-black"
                    }`}
                  >
                    Newest First
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="priceAsc">
                {({ checked }) => (
                  <div
                    className={`cursor-pointer rounded-full p-4 ${
                      checked
                        ? "bg-black text-white"
                        : "border-2 border-black bg-orange-600 text-black"
                    }`}
                  >
                    Price ascending
                  </div>
                )}
              </RadioGroup.Option>
              <RadioGroup.Option value="priceDec">
                {({ checked }) => (
                  <div
                    className={`cursor-pointer rounded-full p-4 ${
                      checked
                        ? " rounded-3xl bg-black text-white"
                        : "border-2 border-black bg-orange-600 text-black"
                    }`}
                  >
                    Price descending
                  </div>
                )}
              </RadioGroup.Option>
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
}
