"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";

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

  const checkEvent = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
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
          className="w-full rounded-full border-2 border-black bg-transparent px-12 py-8 text-xl uppercase text-black placeholder:overflow-visible placeholder:text-xl placeholder:text-black focus:shadow-brutal focus:outline-none active:shadow-brutal"
          type="search"
          name="search"
          aria-label="Search"
        />
      </div>
    </form>
  );
}
