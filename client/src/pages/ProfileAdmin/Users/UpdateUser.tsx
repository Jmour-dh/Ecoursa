import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getUserById } from '../../../apis/users'; // Importez la fonction getUserById depuis votre service

interface User {
  id: string;
  firstname: string;
  email: string;
}

const UpdateUser: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error : any) {
        setError(error.message as string);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <div>Une erreur s'est produite : {error}</div>;
  }

  if (!user) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h2>Informations utilisateur :</h2>
      <p>Nom d'utilisateur : {user.firstname}</p>
      <p>Email : {user.email}</p>

    </div>
  );
}

export default UpdateUser;
