import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="flex justify-between bg-black p-4 text-white">
      <a
        className="flex items-center underline"
        href="tonyschocolonely.tinloof.com"
        target="_blank"
      >
        Inspired by Tinloof{" "}
        <ArrowTopRightOnSquareIcon className="ml-2 inline-block h-4 w-4" />
      </a>
      <p>Created with Next 13, Supabase, Tailwind & Stripe</p>
      <a
        target="_blank"
        className="underline"
        href="https://github.com/bhattrajat/tonyschocolonely/"
      >
        Github{" "}
        <ArrowTopRightOnSquareIcon className="ml-2 inline-block h-4 w-4" />
      </a>
    </footer>
  );
}
