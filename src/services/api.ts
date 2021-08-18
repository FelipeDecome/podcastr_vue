import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.API_URL ||
    "https://cors-anywhere.herokuapp.com/https://listen-api-test.listennotes.com/api/v2",
  headers: {
    "X-ListenAPI-Key": process.env.API_KEY,
  },
});
