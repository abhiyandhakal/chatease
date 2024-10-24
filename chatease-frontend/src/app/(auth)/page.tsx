import Image from "next/image";
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
        <LoginForm />
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
