import React, { useState, ChangeEvent } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaLock } from "react-icons/fa";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
const Register: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (!event.target.value.trim()) {
      setPasswordVisible(false);
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (!event.target.value.trim()) {
      setConfirmPasswordVisible(false);
    }
  };
  return (
    <section className="bg-slate-200 min-h-screen flex flex-col justify-center items-center">
      <div>
        <NavLink to={"/"}>
          <img className="w-[250px] m-3" src={logo} alt="logo" />
        </NavLink>
        <form className="w-[385px] h-fill bg-violent-violet-200 rounded-lg flex flex-col items-center pb-3">
          <div className=" w-[385px] flex items-center justify-between p-4">
            <h4 className="font-bold">Inscription</h4>
            <FaLock className="text-gray-400"/>
          </div>
          <div className="flex w-[355px] justify-between">
          <div className="flex flex-col w-[43%] ">
            <label className="mb-1" htmlFor="firstname">Prénom</label>
            <input className="h-[34px] px-2 rounded focus:outline-none" type="text" id="firstname" />
          </div>
          <div className="flex flex-col w-[43%]">
            <label className="mb-1" htmlFor="lastname">Nom</label>
            <input className="h-[34px] px-2 rounded focus:outline-none" type="text" id="lastname" />
          </div>
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="email">Email</label>
            <input className="h-[34px] px-2 rounded focus:outline-none" type="email" id="email" />
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="password">Mot de passe</label>
            <div className="relative">
            <input
              className='w-[355px] h-[34px] rounded focus:outline-none px-2'
              id='password'
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${!password && 'hidden'}`}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
            </div>
          </div>
          <div className="flex flex-col w-[355px] my-2">
            <label className="mb-1" htmlFor="confirmPassword">Confirmation de mot de passe</label>
            <div className="relative">
            <input
              className='w-[355px] h-[34px] rounded focus:outline-none px-2'
              id='confirmPassword'
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span
              className={`absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer ${!confirmPassword && 'hidden'}`}
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
            </span>
            </div>
          </div>
          <button className='w-[345px] text-lg text-white bg-violent-violet-600 px-5 py-2 m-2 rounded hover:bg-violent-violet-300 hover:text-black'>Inscription gratuite</button>
        </form>
        <p className='mx-5 mt-3 text-sm'>En créant un compte vous acceptez les</p>
        <NavLink to={'#'} className='mx-5 text-sm underline decoration-dotted text-violent-violet-700'>Conditions génerales d'utilisation</NavLink>
        <p className='mx-5 mt-3 text-sm'>Vous avez deja un compte?</p>
        <NavLink to={'/login'} className='mx-5 text-sm underline text-violent-violet-700'>Connectez vous</NavLink>
      </div>
    </section>
  );
};

export default Register;
