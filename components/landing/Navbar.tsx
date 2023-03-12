import LogoImage from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "../mcsc/ThemeToggler";
import { useEffect, useRef } from "react";

const ListItem = ({
  link,
  text,
  target,
}: {
  link: string;
  text: string;
  target?: string;
}) => {
  return (
    <li className="navlist-item text-only">
      <Link href={link} target={target}>
        {text}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const togglerRef = useRef<HTMLInputElement>(null);

  // making toggler work with Enter
  useEffect(() => {
    if (togglerRef.current) {
      togglerRef.current.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          togglerRef.current?.click();
        }
      });
    }
  });

  return (
    <>
      <nav className="nav">
        {/* logo */}
        <Link href="/" className="flex items-center text-2xl md:text-3xl">
          <Image src={LogoImage} alt="logo" height={85} width={85} />
          <span className="font-extrabold tracking-widest">ChatEase</span>
        </Link>

        {/* hamburger */}
        <input
          id="menu-toggler"
          ref={togglerRef}
          name="menu-toggler"
          type="checkbox"
        />
        <label role="button" htmlFor="menu-toggler" className="hamburger">
          <span className="sr-only">Toggle Navigation</span>
          <span className="span"></span>
        </label>

        {/* navlist */}
        <ul role="list" className="navlist">
          <li className="navlist-item">
            <ThemeToggler className="theme-toggler" />
          </li>
          <ListItem
            link="https://github.com/abhiyandhakal/ChatEase"
            target="_blank"
            text="Contribute"
          />
          <ListItem link="/features" text="Features" />
          <li className="navlist-item">
            <Link href={"/signup"} className="button inline-block">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
