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
  offset: number = 0,
  limit: number = 60,
) {
  return http({
    url: `chat/${chatId}?isDirect=${isDirect}&limit=${limit}&offset=${offset}`,

    method: "get",
  });
}

export function editMessageById(messageId: string, message: string) {
  return http({
    url: `message/${messageId}`,
    method: "put",
    data: { message },
  });
}

export function deleteMessageById(messageId: string) {
  return http({
    url: `message/${messageId}`,
    method: "delete",
  });
}

export function createGroup(name: string, description: string) {
  return http({
    url: `group/create`,
    method: "post",
    data: { name, description },
  });
}

export function addMemberToGroup(groupId: string, userId: string) {
  return http({
    url: "group/members/add",
    method: "post",
    data: { groupId, userId },
  });
}
