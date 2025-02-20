import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createGroup } from "@/lib/api/chat";
import { AxiosError } from "axios";
import { chatListAtom } from "@/store/chat";
import { useSetAtom } from "jotai";

export default function AddGroup() {
  const [open, setOpen] = useState(false);
  const refreshChatListAtom = useSetAtom(chatListAtom);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const gname: string = e.currentTarget.gname.value;
    const description: string = e.currentTarget.description.value;

    const isNameValid = gname.trim().length > 0;

    if (!isNameValid) {
      toast.error("Group name is required");
    }
    try {
      const res = await createGroup(gname, description);
      if (res.data) {
        refreshChatListAtom();
        toast.success("Group created successfully");
        setOpen(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Failed to create group");
      }
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-secondary grid place-items-center rounded-lg p-2">
          <Icon icon="akar-icons:edit" fontSize={"2rem"} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription className="p-4">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="gname">Group Name</Label>
                  <Input
                    type="text"
                    name="gname"
                    placeholder="Group Name"
                    className="bg-slate-400 text-black p-2 rounded w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    placeholder="Group Description"
                    className="bg-slate-400 text-black p-2 rounded w-full"
                  />
                </div>
                <Button
                  type="submit"
                  // className="text-black bg-cyan-400 w-fit px-4 rounded"
                >
                  Create
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
