"use client";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/store/profile";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
import Searchbar from "@/components/custom/searchbar";
import { ChangeEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { userSearchByString } from "@/lib/api/user";
import User from "./user";
import {
  chatListAtom,
  chatSelectedAtom,
  isChatScrollingAtom,
} from "@/store/chat";
import { createDmChannel } from "@/lib/api/chat";

const ChatList = () => {
  const chatList = useAtomValue(chatListAtom);
  const [chatSelected, setChatSelected] = useAtom(chatSelectedAtom);
  const setIsScrolling = useSetAtom(isChatScrollingAtom);

  return (
    <>
      <h1 className="text-2xl font-semibold mx-8 my-4">Chats</h1>
      <hr />
      {chatList.map((chat) => {
        if (chat.type === "direct") {
          return (
            <>
              <button
                key={chat.id}
                className={`flex items-center gap-4 ${chatSelected?.id === chat.id ? "bg-secondary hover:opacity-85" : "hover:bg-secondary"} p-4 w-full`}
                onClick={() => {
                  setChatSelected(chat);
                  setIsScrolling(true);
                }}
              >
                <div className="h-14 w-14 relative">
                  <Image
                    src={chat.user.profilePic || "/default-profile.webp"}
                    alt={chat.user.username}
                    height={80}
                    width={80}
                    className="rounded-full h-full w-full object-cover"
                  />
                  {/* active status indicator */}
                  <span
                    className={`h-4 w-4 absolute rounded-full bottom-0.5 right-0.5 ${chat.user.is_online ? "bg-online" : "bg-offline border-2 border-gray-500"}`}
                  ></span>
                </div>
                <div className="flex flex-col justify-center items-start">
                  <span className="font-semibold text-xl">
                    {chat.user.fullName}
                  </span>
                  <span>@{chat.user.username}</span>
                </div>
              </button>
              <hr />
            </>
          );
        }

        return (
          <button key={chat.id}>
            <p>{chat.name}</p>
          </button>
        );
      })}
    </>
  );
};

const UserSearchList = ({
  users,
  handleUserClick,
}: {
  users: User[];
  handleUserClick: (username: string) => Promise<void>;
}) => {
  return (
    <div className="p-4">
      {users.map((user) => (
        <div key={user.username}>
          <button
            className="hover:bg-secondary w-full p-2 rounded active:bg-primary-foreground active:text-primary"
            onClick={() => handleUserClick(user.username)}
          >
            <User user={user} />
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const [search, setSearch] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);
  const setChatSelected = useSetAtom(chatSelectedAtom);
  const refreshChatListAtom = useSetAtom(chatListAtom);
  const setIsScrolling = useSetAtom(isChatScrollingAtom);

  function logout() {
    Cookies.remove("accessToken");
    router.push("/");
  }

  useEffect(() => {
    const getUserSearchResults = setTimeout(async () => {
      if (search.trim().length === 0) {
        setUserSearchResults([]);
        return;
      }
      try {
        const res = await userSearchByString(search);
        const data = res.data.users as User[];
        setUserSearchResults(data);
      } catch (e) {
        if (e instanceof Error) {
          toast.error(e.message);
        }
      }
    }, 2000);

    return () => clearTimeout(getUserSearchResults);
  }, [search]);

  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleUserClick = async (username: string) => {
    // Create a chat channel
    try {
      const res = await createDmChannel(username);
      const data = res.data;
      setChatSelected(data?.data);
      refreshChatListAtom();
    } catch {
      toast.error("Failed to create chat channel");
    } finally {
      setSearch("");
    }
  };

  return (
    <>
      <section className="flex flex-col justify-between w-full h-full">
        <div className="w-full">
          <div className="p-4">
            <Searchbar value={search} onChange={onSearch} />
          </div>
          {search.length === 0 ? (
            <ChatList />
          ) : (
            <UserSearchList
              users={userSearchResults}
              handleUserClick={async (e) => {
                await handleUserClick(e);
                setIsScrolling(false);
              }}
            />
          )}
        </div>
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
