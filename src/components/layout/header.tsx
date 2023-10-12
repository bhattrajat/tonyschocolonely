import Image from 'next/image';
import Cart from '../ui/cart';

export default function Header() {
  return (
    <header className="bg-orange-500 p-4 flex justify-between md:px-8">
      <Image src="/logo.webp" alt="company logo" width={100} height={100} />
      <Cart />
    </header>
  );
}
