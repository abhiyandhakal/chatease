import ThemeSwitch from "@/components/custom/theme-switch";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="flex justify-between items-center mx-auto max-w-screen-2xl px-4 py-2">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/chatease-logo.png"
            alt="chatease-logo"
            height="80"
            width="80"
          />
          <h1 className="text-3xl font-semibold tracking-widest">ChatEase</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
