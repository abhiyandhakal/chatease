import http from "../utils/http";

export function signup(data: {
  fullName: string;
  email: string;
  username: string;
  password: string;
}) {
  return http({
    url: "auth/signup",
    method: "post",
    data,
  });
}

export function login(data: { username: string; password: string }) {
  return http({
    url: "auth/login",
    method: "post",
    data,
  });
}
