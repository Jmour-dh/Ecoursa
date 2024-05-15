import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaLock } from "react-icons/fa";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import * as yup from 'yup';
import { createUser } from '../apis/users';
import {User}  from "../interfaces/User.interface";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [formData, setFormData] = useState<User>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Le prénom doit contenir uniquement des caractères alphabétiques')
      .min(2, 'Le prénom doit comporter au moins 2 caractères')
      .max(30, 'Le prénom peut comporter au plus 30 caractères'),
    lastname: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Le nom de famille doit contenir uniquement des caractères alphabétiques')
      .min(2, 'Le nom de famille doit comporter au moins 2 caractères')
      .max(30, 'Le nom de famille peut comporter au plus 30 caractères'),
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
      navigate('/login');
    } catch (err :any) {
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
    <section className="bg-slate-200 min-h-screen flex flex-col justify-center items-center">
      <div>
        <NavLink to={"/"}>
          <img className="w-[250px] m-3" src={logo} alt="logo" />
        </NavLink>
        <form onSubmit={handleSubmit} className="w-[385px] h-fill bg-violent-violet-200 rounded-lg flex flex-col items-center pb-3">
          <div className=" w-[385px] flex items-center justify-between p-4">
            <h4 className="font-bold">Inscription</h4>
            <FaLock className="text-gray-400"/>
          </div>
          {generalError && <div className="text-red-500 mb-2">{generalError}</div>}
          <div className="flex w-[355px] justify-between">
            <div className="flex flex-col w-[43%] ">
              <label className="mb-1" htmlFor="firstname">Prénom</label>
              <input
                className="h-[34px] px-2 rounded focus:outline-none"
                type="text"
                id="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
            </div>
            <div className="flex flex-col w-[43%]">
              <label className="mb-1" htmlFor="lastname">Nom</label>
              <input
                className="h-[34px] px-2 rounded focus:outline-none"
                type="text"
                id="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
            </div>
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="email">Email</label>
            <input
              className="h-[34px] px-2 rounded focus:outline-none"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="password">Mot de passe</label>
            <div className="relative">
              <input
                className='w-[355px] h-[34px] rounded focus:outline-none px-2'
                id='password'
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${!formData.password && 'hidden'}`}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="confirmPassword">Confirmation de mot de passe</label>
            <div className="relative">
              <input
                className='w-[355px] h-[34px] rounded focus:outline-none px-2'
                id='confirmPassword'
                type={confirmPasswordVisible ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <span
                className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${!formData.confirmPassword && 'hidden'}`}
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
          </div>
          <button type="submit" className='w-[345px] text-lg text-white bg-violent-violet-600 px-5 py-2 m-2 rounded hover:bg-violent-violet-300 hover:text-black'>Inscription gratuite</button>
        </form>
        <p className='mx-5 mt-3 text-sm'>En créant un compte vous acceptez les</p>
        <NavLink to={'#'} className='mx-5 text-sm underline decoration-dotted text-violent-violet-700'>Conditions générales d'utilisation</NavLink>
        <p className='mx-5 mt-3 text-sm'>Vous avez déjà un compte?</p>
        <NavLink to={'/login'} className='mx-5 text-sm underline text-violent-violet-700'>Connectez-vous</NavLink>
      </div>
    </section>
  );
};

export default Register;
