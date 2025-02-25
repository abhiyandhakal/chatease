import MessageBox from "@/components/custom/message";
import Textbox from "@/components/custom/textbox";
import { getChatMessagesByChatId } from "@/lib/api/chat";
import {
  chatMessagesAtom,
  chatSelectedAtom,
  isChatScrollingAtom,
} from "@/store/chat";
import { userAtom } from "@/store/profile";
import { AxiosError } from "axios";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

export default function ChatSection() {
  const chatSelected = useAtomValue(chatSelectedAtom);
  const user = useAtomValue(userAtom);
  const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);
  const selectedChatMessages = chatMessages.find(
    (chatMessage) => chatMessage.chatId === chatSelected?.id,
  );
  const [input, setInput] = useState("");
  const socket = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useAtom(isChatScrollingAtom);

  useEffect(() => {
    if (!chatSelected) return;

    (async function () {
      try {
        const res = await getChatMessagesByChatId(
          chatSelected.id,
          chatSelected.type === "direct",
        );
        const data: { chatId: string; messages: ChatMessage[] } = res.data.data;
        const chatExists = chatMessages.some(
          (chatMessage) => chatMessage.chatId === data.chatId,
        );
        if (!chatExists) {
          setChatMessages([...chatMessages, data]);
        } else {
          setChatMessages(
            chatMessages.map((chatMessage) =>
              chatMessage.chatId === data.chatId ? data : chatMessage,
            ),
          );
        }
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.response?.data);
      }
    })();

    // add chatSelected to url params
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("chat", chatSelected.id);
    url.search = params.toString();
    router.replace(url.toString());
    // eslint-disable-next-line
  }, [chatSelected]);

  useEffect(() => {
    if (!user || !chatSelected) return;

    // Close any existing WebSocket connection when switching chats
    if (socket.current) {
      socket.current.close();
    }

    const newSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_SOCKET_API_URL}/chat?id=${user.id}&channelId=${chatSelected?.id}&type=${chatSelected?.type}`,
    );

    newSocket.onopen = () => console.log("WebSocket connection established");

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data) as ChatMessage;
      setChatMessages((prevMessages) =>
        prevMessages.map((chatMessage) =>
          chatMessage.chatId === chatSelected?.id
            ? {
                chatId: chatMessage.chatId,
                messages: chatMessage.messages.some((msg) => msg.id === data.id)
                  ? chatMessage.messages.map((msg) =>
                      msg.id === data.id ? { ...msg, status: "sent" } : msg,
                    )
                  : [...chatMessage.messages, data],
              }
            : chatMessage,
        ),
      );
    };

    newSocket.onclose = () => console.log("WebSocket connection closed");
    socket.current = newSocket;

    return () => {
      socket.current?.close();
    };
    // eslint-disable-next-line
  }, [user, chatSelected]);

  // scroll to bottom of chat container
  useEffect(() => {
    if (chatContainerRef.current && selectedChatMessages && !isScrolling) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChatMessages, isScrolling]);

  // fetch messages when top of chat container is reached
  useEffect(() => {
    async function handleScroll() {
      if (chatContainerRef.current?.scrollTop !== 0) return;
      setIsScrolling(true);
      if (!chatSelected) return;
      try {
        const res = await getChatMessagesByChatId(
          chatSelected.id,
          chatSelected.type === "direct",
          currentOffset + 1,
        );
        const data: { chatId: string; messages: ChatMessage[] } = res.data.data;
        const chatExists = chatMessages.some(
          (chatMessage) => chatMessage.chatId === data.chatId,
        );
        if (!chatExists) return;
        if (data.messages.length === 0) return;
        setChatMessages(
          chatMessages.map((chatMessage) =>
            chatMessage.chatId === data.chatId
              ? {
                  ...chatMessage,
                  messages: [...data.messages, ...chatMessage.messages],
                }
              : chatMessage,
          ),
        );
        setCurrentOffset((prev) => prev + 1);
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.response?.data);
      }
    }

    const chatContainer = chatContainerRef.current;
    chatContainer?.addEventListener("scroll", handleScroll);

    return () => chatContainer?.removeEventListener("scroll", handleScroll);
  });

  const handleTextSubmit = () => {
    if (
      socket.current &&
      socket.current.readyState === WebSocket.OPEN &&
      input.trim() !== ""
    ) {
      const newMessage: ChatMessage = {
        id: v4(),
        sender: user,
        content: input,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        status: "sending",
      };
      setChatMessages(
        chatMessages.map((chatMessage) =>
          chatMessage.chatId === selectedChatMessages?.chatId
            ? {
                ...chatMessage,
                messages: [...chatMessage.messages, newMessage],
              }
            : chatMessage,
        ),
      );

      socket.current.send(
        JSON.stringify({
          id: newMessage.id,
          content: newMessage.content,
          createdAt: newMessage.createdAt,
          status: newMessage.status,
        }),
      );
      setInput("");
      setIsScrolling(false);
    }
  };

  if (!chatSelected) {
    return (
      <p className="text-3xl font-semibold text-secondary-foreground h-full w-full grid place-items-center">
        Please select a chat!
      </p>
    );
  }

  return (
    <>
      <div className="h-[calc(100vh_-_2.5rem)] w-full flex flex-col justify-end p-4">
        <div
          className="h-full w-full rounded-lg overflow-y-scroll p-3 shadow-xl shadow-gray-700"
          ref={chatContainerRef}
        >
          {selectedChatMessages?.messages.reverse().map((message) => {
            return (
              <MessageBox
                key={message.id}
                type={message.sender.id === user?.id ? "self" : "other"}
                message={{ ...message }}
              />
            );
          })}
        </div>

        <Textbox
          handleSubmit={handleTextSubmit}
          input={input}
          setInput={setInput}
        />
      </div>
    </>
  );
}
