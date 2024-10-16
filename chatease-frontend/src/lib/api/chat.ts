import http from "../utils/http";

export function createDmChannel(username: string) {
  return http({
    url: `chat/create`,
    method: "post",
    data: { username },
  });
}

export function getChatList() {
  return http({
    url: `chat/`,
    method: "get",
  });
}

export function getChatMessagesByChatId(
  chatId: string,
  isDirect: boolean,
  limit: number = 20,
  offset: number = 0,
) {
  return http({
    url: `chat/${chatId}?isDirect=true&limit=1&offset=1`,

    method: "get",
  });
}
