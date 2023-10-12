"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const addSearchParam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    const searchQuery = String(formData.get("search"));
    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");
    router.push(pathname + "?" + params.toString());
  };
  return (
    <form onSubmit={addSearchParam} className="w-full lg:w-auto lg:flex-grow">
      <div className="relative flex items-center">
        <label htmlFor="search" className="absolute left-3">
          <MagnifyingGlassIcon className="h-8 w-8 text-black" />
        </label>
        <input
          id="search"
          placeholder="SEARCH"
          className="w-full rounded-full border-2 border-black bg-transparent px-12 py-8 text-black placeholder:text-black focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:outline-none active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          type="search"
          name="search"
          aria-label="Search"
        />
      </div>
    </form>
  );
}
