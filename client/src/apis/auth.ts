import axios from 'axios';
import { UserAuth } from '../interfaces/Auth.interface';

const API_URL = import.meta.env.VITE_API_URL;

export const signin = async (userAuth: UserAuth) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, userAuth);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Utilisateur non trouvé');
    } else if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Mot de passe incorrect');
    } else {
      throw new Error('Une erreur s\'est produite lors de la connexion');
    }
  }
};


export const signout = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/signout`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error('Une erreur s\'est produite lors de la déconnexion');
    } else {
      throw new Error('Une erreur s\'est produite lors de la déconnexion');
    }
  }
};

