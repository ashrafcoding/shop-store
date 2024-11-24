import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import CartCount from "@/components/ui/cart/cart-count";
import Link from "next/link";

export default function Header() {
  const sections = ["men", "women", "digitals", "kids", "sports", "furniture"];
  return (
    <header className="  border-b border-gray-200 dark:border-gray-200/10">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className="w-auto"
          />
        </Link>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 font-semibold transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  href="/"
                >
                  Home
                </a>
              </li>
              {sections.map((section) => (
                <li key={section}>
                  <a
                    className="text-gray-500 font-semibold  capitalize transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href={`/${section}`}
                  >
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 ">
              <CartCount />

              <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
              </SignedIn>
              <SignedOut>
                {/* Signed out users get sign in button */}
                <div className="bg-gray-100 p-2 rounded text-blue-600 ">
                  <SignInButton />
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
