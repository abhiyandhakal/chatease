import { Switch } from "@headlessui/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

function ThemeToggler({ className, id }: { className?: string; id?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const switchRef = useRef<HTMLButtonElement>(null);

  // switching works with Enter too
  useEffect(() => {
    if (switchRef.current) {
      switchRef.current.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      });
    }
  });

  // useEffect runs only on the client, so it's safe to show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      id={id}
      ref={switchRef}
      checked={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative h-8 w-14 items-center rounded-full transition-opacity hover:opacity-80 ${
        className ? className : "bg-[var(--bg-secondary)]"
      }`}
    >
      <span className="sr-only">Toggle Theme</span>

      <span
        className={`${
          theme === "dark"
            ? "translate-x-7 text-yellow-400"
            : "translate-x-2 text-yellow-700"
        } block h-7 w-6 translate-y-1 transform rounded-full text-xl transition`}
      >
        {theme === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
      </span>
    </Switch>
  );
}

export default ThemeToggler;
