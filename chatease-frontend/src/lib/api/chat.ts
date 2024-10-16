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
