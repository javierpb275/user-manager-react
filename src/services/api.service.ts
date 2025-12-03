import axios from "axios";
import { API_KEY, API_URL } from "../consts/api.consts";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});
