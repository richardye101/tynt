import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenKey = "token";

// got rid of a bidirectional dependency
http.setJwt(getJwt());

// logic for authentication or removing authentication should live here
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getUserData(user) {
  const { data } = await http.get(apiEndpoint);

  return data;
}

export function getJwt() {
  console.log(localStorage.getItem(tokenKey));
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
