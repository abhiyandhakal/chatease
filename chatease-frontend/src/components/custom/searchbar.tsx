import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export default function Searchbar(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <div
      className={cn(
        "flex items-center w-full space-x-2 rounded-lg border border-border bg-secondary px-3.5 py-2",
        props.className,
      )}
    >
      <SearchIcon className="h-4 w-4" />
      <Input
        type="search"
        placeholder="Search"
        className="w-full border-0 h-8 font-semibold"
        {...props}
      />
    </div>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
