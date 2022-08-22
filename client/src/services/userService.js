import http from "./httpService";
const apiEndpoint = "/users";

export async function register(user) {
  return await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    phone: user.phone,
  });
}
