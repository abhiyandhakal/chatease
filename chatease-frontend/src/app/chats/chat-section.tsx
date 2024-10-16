import { getChatMessagesByChatId } from "@/lib/api/chat";
import { chatMessages, chatSelected } from "@/store/chat";
import { AxiosError } from "axios";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ChatSection() {
  const chatSelectedAtom = useAtomValue(chatSelected);
  const [chatMessagesAtom, setChatMessagesAtom] = useAtom(chatMessages);

  useEffect(() => {
    if (!chatSelectedAtom) return;

    (async function () {
      try {
        const res = await getChatMessagesByChatId(
          chatSelectedAtom.id,
          chatSelectedAtom.type === "direct",
        );
        const data: { chatId: string; messages: ChatMessage[] } = res.data.data;
        let chatMessages = chatMessagesAtom.map((chatMessage) => {
          if (chatMessage.chatId === data.chatId) {
            return {
              chatId: data.chatId,
              messages: [...data.messages, ...chatMessage.messages].sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              ),
            };
          }
          return chatMessage;
        });
        if (
          !chatMessages.some(
            (chatMessage) => chatMessage.chatId === data.chatId,
          )
        ) {
          chatMessages = [...chatMessages, data];
        }
        setChatMessagesAtom(chatMessages);
        console.log(chatMessages);
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.response?.data);
      }
    })();
    // eslint-disable-next-line
  }, [chatSelectedAtom]);

  if (!chatSelectedAtom) {
    return (
      <p className="text-3xl font-semibold text-secondary-foreground h-full w-full grid place-items-center">
        Please select a chat!
      </p>
    );
  }

  if (chatSelectedAtom.type === "group")
    return <>{JSON.stringify(chatSelectedAtom)}</>;

  return <>{JSON.stringify(chatSelectedAtom)}</>;
}
