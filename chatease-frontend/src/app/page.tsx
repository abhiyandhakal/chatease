import ThemeSwitch from "@/components/custom/theme-switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form";

export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 p-8 h-full place-items-center">
      <div className="grid place-content-center gap-8">
        <div className="flex gap-4 items-end">
          <div className="grid place-content-center">
            <span className="font-bold text-[3.5rem] tracking-widest leading-tight">
              Chat
            </span>
            <span className="font-bold text-[3.5rem] tracking-widest leading-tight">
              With
            </span>
          </div>
          <span className="text-9xl font-[900] tracking-widest text-accent dark:text-[#609CBD]">
            Ease
          </span>
        </div>
        <Card className="bg-secondary border-none shadow-lg px-8 py-6 max-w-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-4xl">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
      <Image
        src="/heroimg.webp"
        alt="Hero Image"
        height="600"
        width="600"
        className="hidden lg:block"
      />
    </main>
  );
}
