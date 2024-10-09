"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Page() {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => {
          Cookies.remove("accessToken");
          router.push("/");
        }}
      >
        Log Out
      </Button>
    </div>
  );
}

export default Page;
