import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import bgImage from '../assets/images/bg.png';
import logo from '../assets/images/logo.png';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from "../context";
import * as yup from 'yup';
import { UserAuth } from "../interfaces/Auth.interface";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Chargement...</div>;
  }

  const { signin, user } = authContext;
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserAuth>({
    email: '',
    password: '',
  });

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setGeneralError(null);
      await signin(formData);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {user ? (
        user.is_admin ? (
          <Navigate to="/profileAdmin/home" />
        ) : (
          <Navigate to="/profileUser" />
        )
      ) : (
        <section className='min-h-screen flex flex-col justify-center items-center' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
          <div>
            <NavLink to={'/'}>
              <img className='w-[250px] m-3' src={logo} alt="logo" />
            </NavLink>
            <form onSubmit={handleSubmit} className='w-[385px] h-fill pb-2 bg-violent-violet-200 rounded-lg flex flex-col items-center'>
              <div className=' w-[385px] flex items-center justify-between p-5'>
                <h4 className='font-bold'>Connexion</h4>
                <span className='text-xs underline decoration-dotted cursor-pointer'>mot de passe oublié ?</span>
              </div>
              {generalError && <div className="text-red-500 mb-2">{generalError}</div>}
              <div className="relative mx-5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MdEmail />
                </span>
                <input className='w-[345px] h-[34px] pl-10 rounded focus:outline-none' type="email" placeholder='Email' id='email' value={formData.email}
                  onChange={handleInputChange} />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              <div className="relative m-5">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <FaLock />
                </span>
                <input
                  className='w-[345px] h-[34px] pl-10 rounded focus:outline-none'
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Mot de passe'
                  id='password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${!formData.password && 'hidden'}`}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              <button type="submit" className='w-[345px] text-lg text-white bg-violent-violet-600 px-5 py-2 rounded hover:bg-violent-violet-300 hover:text-black'>Se connecter</button>
            </form>
            <p className='mx-5 mt-3 text-sm'>Vous n'avez pas de compte?</p>
            <NavLink to={'/register'} className='mx-5 text-sm underline text-violent-violet-700'>Créer un compte gratuitement</NavLink>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
