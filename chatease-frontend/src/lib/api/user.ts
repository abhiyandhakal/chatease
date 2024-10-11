import http from "../utils/http";

export function getOwnUserDetail() {
  return http({
    url: "user/profile",
    method: "get",
  });
}
