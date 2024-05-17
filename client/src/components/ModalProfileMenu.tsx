import React, { useContext, useState, useRef } from 'react';
import imageClear from '../assets/images/bg-menu-profile_clear.png';
import { AuthContext } from "../context";
import { FaCaretRight } from "react-icons/fa";
import { FaSun, FaGear } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const ModalProfileMenu: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [status, setStatus] = useState('En ligne'); 
  const contentTimeoutRef = useRef<NodeJS.Timeout>();

  if (!authContext) {
    return <div>Chargement...</div>;
  }

  const { signout, user } = authContext;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowContent(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    contentTimeoutRef.current = setTimeout(() => {
      setShowContent(false);
    }, 200);
  };

  const handleContentMouseEnter = () => {
    if (contentTimeoutRef.current) {
      clearTimeout(contentTimeoutRef.current);
    }
    setShowContent(true);
  };

  const handleContentMouseLeave = () => {
    setShowContent(false);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setShowContent(false);
  };
  
  return (
    <div className='bg-white shadow-md rounded-md w-[256px] h-full relative'>
      <div className='w-full h-146px relative'>
        <img className='w-full h-full object-cover rounded-tl-md rounded-tr-md' src={imageClear} alt="menuImage" />
        <div className='absolute top-1/2 left-0 w-full text-center text-white transform -translate-y-1/2'>
          <div>
            <p className='font-bold text-lg text-black'>{user?.firstname} {user?.lastname}</p>
            <p className='text-sm text-blue-400'>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className='w-full h-[48px] flex items-center justify-between pl-4' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className='flex items-center mr-2'>
          <div className={`w-[10px] h-[10px] rounded-full ${status === 'En ligne' ? 'bg-green-600' : status === 'Occupé' ? 'bg-orange-600' : 'bg-black'} mr-3`}></div>
          <p>{status}</p>
        </div>
        <FaCaretRight className='mr-2' />
      </div>
      {showContent && (
        <div className="w-[256px] h-fill shadow-md rounded-md absolute top-[170px] right-[256px]" onMouseEnter={handleContentMouseEnter} onMouseLeave={handleContentMouseLeave}>
          <div className='flex items-center ml-3  py-3' onClick={() => handleStatusChange('En ligne')}>
            <div className='w-[10px] h-[10px] rounded-full bg-green-600 mr-3'></div>
            <div className='flex flex-col'>
              <p>En ligne</p>
              <p className='text-gray-400 text-xs'>Vous recevez des notifications</p>
            </div>
          </div>
          <div className='flex items-center ml-3  py-3' onClick={() => handleStatusChange('Occupé')}>
            <div className='w-[10px] h-[10px] rounded-full bg-orange-600 mr-3'></div>
            <div className='flex flex-col'>
              <p>Occupé</p>
              <p className='text-gray-400 text-xs'>Vous ne recevez pas de notifications</p>
            </div>
          </div>
          <div className='flex items-center ml-3  py-3' onClick={() => handleStatusChange('Hors ligne')}>
            <div className='w-[10px] h-[10px] rounded-full bg-black mr-3'></div>
            <div className='flex flex-col'>
              <p>Hors ligne</p>
              <p className='text-gray-400 text-xs'>Vous apparaissez hors ligne tout <br/> en ayant accès au chat</p>
            </div>
          </div>
        </div>
      )}
      <div className='w-full h-[48px] flex items-center justify-between pl-4'>
        <div className='flex items-center mr-2'>
          <FaSun className='mr-3' />
          <p>Thème</p>
        </div>
        <FaCaretRight className='mr-2'/>
      </div>
      <div className='w-full h-[48px] flex items-center justify-between pl-4 border-b-2'>
        <div className='flex items-center mr-2'>
          <FaGear className='mr-3' />
          <p>Paramètre</p>
        </div>
      </div>
      <div className='w-full h-[48px] flex items-center justify-between pl-4 border-b-2'>
        <div className='flex items-center mr-2'>
          <MdOutlineLogout  className='mr-3' />
          <NavLink onClick={() => signout()} to="/">Déconnexion</NavLink>
        </div>
      </div>
    </div>
  );
}

export default ModalProfileMenu;
