import Image from "next/image";
import Cart from "../ui/cart";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between bg-orange-500 p-4 md:px-8">
      <Link href="/">
        <Image src="/logo.webp" alt="company logo" width={100} height={100} />
      </Link>
      <Cart />
    </header>
  );
}
