import axios from "axios";
import { UserAuth } from "../interfaces/Auth.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const signin = async (userAuth: UserAuth) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, userAuth);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Utilisateur non trouvé");
    } else if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Mot de passe incorrect");
    } else {
      throw new Error("Une erreur s'est produite lors de la connexion");
    }
  }
};

export const getMe = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "Une erreur s'est produite lors de la récupération des informations utilisateur"
      );
    } else {
      throw new Error(
        "Une erreur s'est produite lors de la récupération des informations utilisateur"
      );
    }
  }
};

export const signout = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {  // Ajoutez un objet vide pour le corps de la requête
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("token"); // Supprimez le jeton du stockage local après la déconnexion réussie
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Une erreur s'est produite lors de la déconnexion: " + error.message); // Capturez l'erreur et affichez-la
    } else {
      throw new Error("Une erreur s'est produite lors de la déconnexion");
    }
  }
};

