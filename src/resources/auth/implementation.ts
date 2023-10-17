import axios from "axios";
import { AuthRepository } from "./interface.js";


const authAxios = axios.create({
  baseURL: process.env.AUTH_API,
})

export const authRepoMs: AuthRepository = {

  login: async (username, password) => {
    console.log("authRepoMs.login");
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);
    const response = await authAxios.post("/token", formdata);
    return response.data;
  },

  me: async (token) => {
    console.log("authRepoMs.me"); 
    const response = await authAxios.get("/status", { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },

  register: async (username, password, userId, role) => {
    console.log("authRepoMs.register");
    const response = await authAxios.post("/register", { username, password, user_id: userId, role: role } );
    return response.data;
  }

}