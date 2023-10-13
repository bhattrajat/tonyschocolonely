"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useClickAway } from "@uidotdev/usehooks";

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
          className="absolute left-0 right-0 top-full z-10 mt-2 flex justify-between rounded-3xl border-2 border-black bg-yellow-400 p-4 text-black lg:px-8"
        >
          <div>
            <h2 className="text-2xl uppercase">Filters</h2>
            <RadioGroup
              value={searchParams.get("sortBy") ?? ""}
              onChange={setSorting}
              className="flex items-start gap-4 uppercase"
            >
              <RadioGroup.Label className="sr-only">
                Categories
              </RadioGroup.Label>
              <RadioGroup.Option value="">
                {({ checked }) => (
                  <div
                    className={`my-4 cursor-pointer rounded-full p-4 ${
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
                    className={`my-4 cursor-pointer rounded-full p-4 ${
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
                    className={`my-4 cursor-pointer rounded-full p-4 ${
                      checked
                        ? "rounded-3xl bg-black text-white"
                        : "border-2 border-black bg-orange-600 text-black"
                    }`}
                  >
                    Price descending
                  </div>
                )}
              </RadioGroup.Option>
            </RadioGroup>
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
