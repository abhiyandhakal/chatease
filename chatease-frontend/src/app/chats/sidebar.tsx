"use client";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/store/profile";
import { useAtomValue } from "jotai";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import ThemeSwitch from "@/components/custom/theme-switch";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  function logout() {
    Cookies.remove("accessToken");
    router.push("/");
  }

  return (
    <>
      <section className="flex flex-col justify-between w-full h-full">
        <div></div>
        <div className="flex w-full items-center p-2 gap-4">
          <div className="flex items-center gap-4 hover:bg-secondary rounded-lg p-4 w-full">
            <Image
              src={user.profilePic || "/default-profile.webp"}
              height={80}
              width={80}
              alt={user.fullName}
              className="rounded-full h-20 w-20 object-cover"
            />
            <div>
              <p className="font-semibold text-2xl">{user.fullName}</p>
              <p className="text-secondary-foreground">@{user.username}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="h-full">
                <Icon icon="solar:menu-dots-outline" fontSize={"2rem"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:[&_*]:text-primary">
                <ThemeSwitch />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="destructive"
                  className="w-full flex gap-2"
                  onClick={logout}
                >
                  <Icon icon="uil:exit" fontSize="1.2rem" />
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </>
  );
}
