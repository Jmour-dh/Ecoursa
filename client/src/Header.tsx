import React from 'react';
import logo from './assets/images/logo.png'
import { FaChevronDown } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className='bg-violent-violet-100 h-[80px] flex items-center justify-around font-roboto sticky top-0'>
      <NavLink to= '/'>
      <img src={logo} alt="logo" />
      </NavLink>
      
      <nav >
        <ul className='flex gap-x-4'>
          <li className='flex items-center gap-x-1 '>Formations
            <FaChevronDown className="animate-bounce text-xs"/>
          </li>
          <NavLink to= '/tarifs'>Tarifs</NavLink>
        </ul>
      </nav>

      <div className='flex items-center gap-x-5'>
        <ul>
        <NavLink to={'/login'}>Connexion</NavLink>
        </ul>
        
        <NavLink to={'/register'}  className='bg-violent-violet-600 px-5 py-2 rounded hover:bg-violent-violet-200 hover:text-white'>Commencer</NavLink>
      </div>

    </header>
  );
};

export default Header;
