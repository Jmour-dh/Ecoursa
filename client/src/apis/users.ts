import axios from "axios";
import { User } from "../interfaces/User.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, user);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Cet utilisateur est déjà inscrit');
    } else {
      throw error;
    }
  }
};
