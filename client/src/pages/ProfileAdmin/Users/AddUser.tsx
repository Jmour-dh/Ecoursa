import React, { ChangeEvent, FormEvent, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { UserCreate } from "../../../interfaces/User.interface";
import { createUser } from "../../../apis/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserCreate>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Le prénom doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le prénom doit comporter au moins 2 caractères")
      .max(30, "Le prénom peut comporter au plus 30 caractères"),
    lastname: yup
      .string()
      .matches(
        /^[A-Za-z\s]+$/,
        "Le nom de famille doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le nom de famille doit comporter au moins 2 caractères")
      .max(30, "Le nom de famille peut comporter au plus 30 caractères"),
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setGeneralError(null);
      await createUser(formData);
      toast.success("Utilisateur créé avec succès !");
      setTimeout(() => {
        navigate("/profileAdmin/users/list");
      }, 3000);
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setGeneralError(err.message);
      }
    }
  };

  return (
    <section className="w-full flex flex-col bg-gray-100">
      <div className="m-2">
        <h2 className="text-xl p-3 shadow-md">
          Ajouter un nouveau utilisateur
        </h2>
      </div>
      <div className="flex justify-center items-center h-[84.1vh]">
        <div className="flex bg-white w-2/4 min-h-[300px] shadow-md rounded-xl">
          <form className="flex flex-col m-4 w-full" onSubmit={handleSubmit}>
            {generalError && (
              <div className="text-red-500 mb-2 mx-auto">{generalError}</div>
            )}
            <label htmlFor="firstname">Prénom*</label>
            <input
              className="h-[34px] px-2 mb-2 rounded focus:outline-none border border-violet-300"
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs">{errors.firstname}</p>
            )}
            <label htmlFor="lastname">Nom*</label>
            <input
              className="h-[34px] px-2 mb-2 rounded focus:outline-none border border-violet-300"
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs">{errors.lastname}</p>
            )}
            <label htmlFor="email">Email*</label>
            <input
              className="h-[34px] px-2 mb-2 rounded focus:outline-none border border-violet-300"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <label htmlFor="password">Mot de passe*</label>
            <div className="relative">
              <input
                className="h-[34px] w-full px-2 mb-2 rounded focus:outline-none border border-violet-300"
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${
                  !formData.password && "hidden"
                }`}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <label htmlFor="confirmPassword">
              Confirmation de mot de passe*
            </label>
            <div className="relative">
              <input
                className="h-[34px] w-full px-2 mb-2 rounded focus:outline-none border border-violet-300"
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span
                className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${
                  !formData.confirmPassword && "hidden"
                }`}
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <LiaEyeSlashSolid />
                ) : (
                  <LiaEyeSolid />
                )}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-[300px] mx-auto text-lg text-white bg-green-600 px-5 py-2 m-2 rounded hover:bg-green-300 hover:text-black"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AddUser;
