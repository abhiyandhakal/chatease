import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addMemberToGroup } from "@/lib/api/chat";
import { AxiosError } from "axios";
import { chatListAtom } from "@/store/chat";
import { useSetAtom } from "jotai";
import { CirclePlus } from "lucide-react";
import Searchbar from "./searchbar";
import { userSearchByString } from "@/lib/api/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function AddMember({ groupId }: { groupId: string }) {
  const refreshChatListAtom = useSetAtom(chatListAtom);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<User[]>([]);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 px-4 py-2 hover:bg-secondary w-full">
        <CirclePlus />
        Add Member
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription className="p-4 w-full">
            <p>Search to add a memeber</p>
            <Searchbar value={search} onChange={onSearch} />
            <div>
              {userSearchResults.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 p-2 justify-between w-full text-primary"
                  >
                    <div className="flex items-center gap-2 p-2">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePic ? user.profilePic : undefined}
                          alt={user.fullName}
                        />
                        <AvatarFallback>
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{user.fullName}</p>
                        <p>{user.username}</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        try {
                          await addMemberToGroup(groupId, user.id);
                          refreshChatListAtom();
                          toast.success("User added to group");
                          setOpen(false);
                          setSearch("");
                          setUserSearchResults([]);
                        } catch (e) {
                          if (e instanceof AxiosError) {
                            toast.error(e.response?.data?.message);
                          }
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
