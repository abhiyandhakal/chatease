import { getChatList } from "@/lib/api/chat";
import { atom, getDefaultStore } from "jotai";
import { atomWithRefresh } from "jotai/utils";

const store = getDefaultStore();

export const chatListAtom = atomWithRefresh(async () => {
  const response = await getChatList();
  const data = response.data.data;
  return data as Chat[];
});

const url = new URL(window.location.href);
const chatId = url.searchParams.get("chat");

export const chatSelectedAtom = atom<Chat | null>(null);

export const chatMessagesAtom = atom<
  {
    messages: ChatMessage[];
    chatId: string;
  }[]
>([]);

if (chatId || chatId === "" || chatId === "null" || chatId === "undefined") {
  // const chat = chatListAtom.find((chat) => chat.id === chatId);
  // chatSelectedAtom.set(chat);
  (async function () {
    const chats = await store.get(chatListAtom);
    const chat = chats.find((chat) => chat.id === chatId);
    if (chat) store.set(chatSelectedAtom, chat);
  })();
}
