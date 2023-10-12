"use client";

import { useState } from "react";

export default function Filters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="rounded-full border-2 border-black bg-orange-500 p-2.5 px-8 py-4 font-bold uppercase text-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        Filters and Sorting
      </button>
      <div className="absolute"></div>
    </>
  );
}
