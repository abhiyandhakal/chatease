import HeroImage from "../../assets/heroimg.webp";
import Image from "next/image";
import SkipToContent from "../mcsc/SkipToContent";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";

const Landing = () => {
  return (
    <>
      <SkipToContent />
      <Navbar />

      <main
        id="main-content"
        className="mx-auto grid min-h-[calc(100vh_-_var(--nav-height)_-_var(--footer-height))] w-[80vw] max-w-[100rem] place-content-center justify-center px-6 lg:grid-cols-2"
      >
        {/*hero text*/}
        <h1 className="flex w-fit place-items-center gap-4 text-[clamp(6rem,10vw_+_1rem,12rem)] font-extrabold text-[var(--h1-hero-clr)]">
          <div className="grid h-fit justify-center text-[clamp(2.5rem,4vw_+_1rem,5rem)] leading-tight text-[var(--text-primary)]">
            <span className="">Chat</span>
            <span>With</span>
          </div>
          Ease
        </h1>

        {/*hero image*/}
        <Image
          src={HeroImage}
          height={800}
          width={800}
          alt="ChatEase - Chat with Ease"
          className="lg:row-span-2"
        />

        <LoginForm />
      </main>

      {/* footer */}
      <footer className="flex h-[var(--footer-height)] items-end p-6 text-base sm:text-xl">
        All rights reserved. Copyright &copy; 2023 ChatEase
      </footer>
    </>
  );
};

export default Landing;
