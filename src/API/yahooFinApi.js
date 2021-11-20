import axios from "axios";

export const yahooFinApi = axios.create({
  baseURL: "https://yfapi.net",
  headers: {
    accept: "application/json",
    "X-API-KEY": "ez5xD9YCVMaNEkJ1vxMvN8WZbPr1nGfW2LNZa2VP",
    // "X-API-KEY": "geRnN92Dsx42JwSByyDLi5YICPKBzX654KLzh4db",
  },
});
