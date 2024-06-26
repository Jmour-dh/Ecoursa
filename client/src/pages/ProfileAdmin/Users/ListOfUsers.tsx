import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUserByAdmin } from "../../../apis/users";
import { User } from "../../../interfaces/User.interface";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import Pagination from "../../../components/Pagination";
import ModalDelete from "../../../components/ModalDelete"; // Importer le composant ModalDelete
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListOfUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getAllUsers();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setUsers(sortedData);
      } catch (err) {
        setError(
          "Une erreur s'est produite lors de la récupération des utilisateurs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await deleteUserByAdmin(selectedUserId);
        const updatedUsers = users.filter((user) => user.id !== selectedUserId);
        setUsers(updatedUsers);
        toast.success("Utilisateur supprimé avec succès");
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la suppression de l'utilisateur"
        );
      } finally {
        setSelectedUserId(null);
        setIsModalOpen(false);
      }
    }
  };

  const openDeleteModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className=" flex flex-col items-center p-4">
      <div className="w-full flex justify-between items-center mb-4 px-10">
        <h1 className="text-2xl font-bold text-violent-violet-500">
          Liste des utilisateurs
        </h1>
        <NavLink
          to={"/profileAdmin/users/new"}
          className="text-green-600 hover:text-green-700 flex items-center pr-10 border-spacing-2 "
        >
          <IoPersonAddSharp className="border border-gray-400 rounded-full p-1 w-7 h-7" />
        </NavLink>
      </div>

      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prénom
            </th>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date de création
            </th>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date de mise à jour
            </th>
            <th className="px-6 py-6 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                {user.lastname}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                {user.firstname}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                {user.email}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap">
                {new Date(user.updated_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-center whitespace-nowrap flex justify-center items-center space-x-2 mt-1">
                <NavLink to={`../updateUser/${user.id}`}>
                  <FaUserEdit className="text-blue-500 hover:text-blue-700 text-lg" />
                </NavLink>
                <MdDelete
                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  onClick={() => openDeleteModal(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ModalDelete
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        title="Confirmation de suppression"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur? Cette action est irréversible."
        onConfirm={handleDeleteUser}
      />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
      />
    </section>
  );
};

export default ListOfUsers;
