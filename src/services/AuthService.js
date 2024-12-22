import ApiService from "./ApiService";

export async function apiLogin(data) {
  return ApiService.fetchData({
    url: "/api/auth/login",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export async function apiLogout(data) {
  return ApiService.fetchData({
    url: "/api/auth/logout",
    method: "post",
    data,
  });
}

