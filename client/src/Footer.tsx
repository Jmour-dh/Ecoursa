import React, { useContext } from 'react';
import logo from './assets/images/logo.png';
import { BiLogoFacebook } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { FaLinkedinIn } from "react-icons/fa6";
import { AuthContext } from "./context";

const Footer: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Chargement...</div>;
  }

  const { user } = authContext;
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <>
      {!user ? (
        <footer className="min-h-64 bg-violent-violet-300 flex  justify-around pt-10">
          <div className='flex items-start flex-col'>
            <img src={logo} alt="logo" />
            <span className='my-3'>© {year} Ecoursa </span>
            <div className='flex gap-x-3 my-3'>
              <NavLink to={'#'}><BiLogoFacebook className='text-xl' /></NavLink>
              <NavLink to={'#'}><FaLinkedinIn className='text-xl'/></NavLink>
              <NavLink to={'#'}><FaGithub className='text-xl'/></NavLink>
            </div>
            <ul className='flex flex-col my-3'>
              <NavLink to={'#'}>Condition générale d'utilisation</NavLink>
              <NavLink to={'#'}>Politique d'utilisation des données personnelles</NavLink>
              <NavLink to={'#'}>Mentions légales</NavLink>
            </ul>
          </div>
          <div className='flex items-start flex-col'>
            <h3 className='text-xl'>Les formations</h3>
            <ul className='flex flex-col gap-y-1 my-3'>
              <NavLink to={'#'} className='underline'>Formation Algorithme</NavLink>
              <NavLink to={'#'} className='underline'>Formation Angular</NavLink>
              <NavLink to={'#'} className='underline'>Formation Javascript</NavLink>
              <NavLink to={'#'} className='underline'>Formation React JS</NavLink>
            </ul>
          </div>
          <div className='flex items-start flex-col'>
            <h3 className='text-xl'>Entreprise & Professeur</h3>
            <NavLink to={'#'} className='underline'>Offre entreprise</NavLink>
            <NavLink to={'#'} className='underline'>Enseigner</NavLink>
            <NavLink to={'#'} className='underline'>Blog</NavLink>
            <span className='my-3'> Vous avez une question? <br/> contact@ecoursa.fr</span>
          </div>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
