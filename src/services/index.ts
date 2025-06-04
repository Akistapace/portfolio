import { CreateClient } from "./http";

const environment = {
  apiUrl: import.meta.env.VITE_API_URL,
}

export const HttpClientApi = CreateClient(environment.apiUrl)

export const Services = {
  HttpClientApi,
}