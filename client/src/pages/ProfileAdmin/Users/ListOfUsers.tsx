import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../apis/users';
import { User } from '../../../interfaces/User.interface';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { IoPersonAddSharp } from "react-icons/io5";

const ListOfUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getAllUsers();
        const sortedData = data.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        setUsers(sortedData);
      } catch (err) {
        setError('Une erreur s\'est produite lors de la récupération des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="flex flex-col items-center p-4">
      <div className="w-full flex justify-between items-center mb-4 px-10">
        <h1 className="text-2xl font-bold text-violent-violet-500">Liste des utilisateurs</h1>
        <NavLink to={'#'} className="text-green-600 hover:text-green-700 flex items-center pr-10 border-spacing-2 ">
          <IoPersonAddSharp className="border border-gray-400 rounded-full p-1 w-8 h-8" />
        </NavLink>
      </div>
      
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date de création</th>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date de mise à jour</th>
            <th className="px-1 py-1 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="text-center whitespace-nowrap">{user.lastname}</td>
              <td className="text-center whitespace-nowrap">{user.firstname}</td>
              <td className="text-center whitespace-nowrap">{user.email}</td>
              <td className="text-center whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="text-center whitespace-nowrap">{new Date(user.updated_at).toLocaleDateString()}</td>
              <td className="text-center whitespace-nowrap flex justify-center items-center space-x-2 mt-1">
                <NavLink to={'#'}>
                  <FaUserEdit className="text-blue-500 hover:text-blue-700 text-lg" />
                </NavLink>
                <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ListOfUsers;
