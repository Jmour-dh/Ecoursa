import axios, { AxiosError } from "axios";
import { User,UserCreate } from "../interfaces/User.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async (user: UserCreate) => {
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

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token non trouvé, veuillez vous authentifier");
    }
    const response = await axios.get<User[]>(`${API_URL}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error("Aucun utilisateur trouvé");
      }
    }
    throw error;
  }
};

export const deleteUserByAdmin = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token non trouvé, veuillez vous authentifier");
    }
    const response = await axios.delete(`${API_URL}/auth/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error("Utilisateur non trouvé");
      } else if (axiosError.response?.status === 401) {
        throw new Error("Non autorisé à supprimer l'utilisateur");
      }
    }
    throw error;
  }
};

