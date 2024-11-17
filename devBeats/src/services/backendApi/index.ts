import axios from "axios";

const API = process.env.EXPO_PUBLIC_MY_API_URL;

export const api = axios.create({
  baseURL: API,
});

type Form = {
  email: string;
  password: string;
};
export const createSession = async (form: Form) => {
  const { email, password } = form;

  const response = await api.get(`/users?email=${email}&senha=${password}`);

  return response;
};
