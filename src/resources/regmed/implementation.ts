import axios from "axios";
import { RegMedRepository } from "./interface";

const regmedAxios = axios.create({
  baseURL: process.env.REGMED_API,
})

regmedAxios.interceptors.request.use(request => {
  console.log('Starting Request on REGMED: ', JSON.stringify(request, null, 2))
  return request
})

export const regmedRepoMs: RegMedRepository = {
  get: async(id: number) => {
    const response = await regmedAxios.get(`/get/${id}`);
    return response?.data.data;
  },
  
  getAll: async () => {
    const response = await regmedAxios.get("/getAll");
    return response?.data.data;
  },

  getMany: async (ids: Array<number>) => {
    const response = await regmedAxios.post("/getMany", { ids })
    return response?.data.data;
  },

  create: async (detail: string) => {
    const response = await regmedAxios.post("/create", {
      detail
    });
    return response?.data.data;
  },

  update: async (id: number, detail: string) => {
    const response = await regmedAxios.put(`/update/${id}`, { detail });
    return response?.data.data;
  },

  delete: async (id: number) => {
    const response = await regmedAxios.delete(`/delete/${id}`);
    return response?.data.data;
  }
}