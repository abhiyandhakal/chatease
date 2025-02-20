import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteMessageById, editMessageById } from "@/lib/api/chat";
import { useState } from "react";
import { useAtom } from "jotai";
import { chatMessagesAtom } from "@/store/chat";

interface MessageBoxProps {
  type: "self" | "other";
  message: ChatMessage;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type }) => {
  const [editing, setEditing] = useState(false);
  const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);

  async function editMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.children[0] as HTMLInputElement;
    const newMessage = input.value;
    try {
      const res = await editMessageById(message.id, newMessage);
      const data = res.data;

      if (data) {
        toast.success("Message edited successfully");

        let chatId = "";
        for (const chat of chatMessages) {
          const chatLookingFor = chat.messages.find(
            (msg) => msg.id === message.id,
          );

          if (chatLookingFor) {
            chatId = chat.chatId;
            break;
          }
        }
        const newChatMessages = chatMessages.map((chat) => {
          if (chat.chatId === chatId) {
            return {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === message.id ? { ...msg, content: newMessage } : msg,
              ),
            };
          }

          return chat;
        });
        setChatMessages(newChatMessages);
      }

      setEditing(false);

      // eslint-disable-next-line
    } catch (error) {
      toast.error("Failed to edit message");
    }
  }

  async function deleteMessage() {
    try {
      const res = await deleteMessageById(message.id);
      const data = res.data;

      if (!data) {
        throw new Error("Failed to delete message");
      }

      let chatId = "";
      for (const chat of chatMessages) {
        const chatLookingFor = chat.messages.find(
          (msg) => msg.id === message.id,
        );

        if (chatLookingFor) {
          chatId = chat.chatId;
          break;
        }
      }
      const newChatMessages = chatMessages.map((chat) => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            messages: chat.messages.filter((msg) => {
              if (msg.id !== message.id) {
                console.log(msg, message);
              }
              return msg.id !== message.id;
            }),
          };
        }

        return chat;
      });
      setChatMessages(newChatMessages);

      toast.success("Message deleted successfully");

      // eslint-disable-next-line
    } catch (error) {
      toast.error("Failed to delete message");
    }
  }

  return (
    <div
      className={`w-full flex mt-1 items-center gap-2 ${type === "self" ? "justify-end" : ""}`}
      onMouseEnter={(e) => {
        const menu = e.currentTarget.querySelector(".menu");
        if (menu) {
          menu.classList.remove("hidden");
        }
      }}
      onMouseLeave={(e) => {
        const menu = e.currentTarget.querySelector(".menu");
        if (menu) {
          menu.classList.add("hidden");
        }
      }}
    >
      <div className="menu text-muted-foreground hidden">
        <span>{new Date(message.createdAt).toLocaleString()}</span>
      </div>
      {type === "self" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEditing(true)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={deleteMessage}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {editing ? (
        <form onSubmit={editMessage}>
          <input
            type="text"
            defaultValue={message.content}
            className={`w-fit py-2 rounded px-4 text-black ${type === "self" ? "bg-blue-400" : "bg-amber-400"}`}
          />
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <p
          className={`w-fit py-2 rounded px-4 text-black ${type === "self" ? "bg-blue-400" : "bg-amber-400"}`}
        >
          {message.content}
        </p>
      )}
    </div>
  );
};

export default MessageBox;
