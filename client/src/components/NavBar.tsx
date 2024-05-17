import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import profileImage from '../assets/images/profileImage.png';
import ModalProfileMenu from './ModalProfileMenu';

interface NavBarProps {
  toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-outer-space-300 h-[48px] flex items-center justify-between sticky top-0 w-full px-4'>
      <div>
        <GiHamburgerMenu onClick={toggleSidebar} className='cursor-pointer' />
      </div>
      <div ref={profileRef} className="relative">
        <img
          onClick={handleProfileClick}
          className='w-[28px] h-[28px] rounded-full border-2 border-green-500 cursor-pointer'
          src={profileImage}
          alt="profileImage"
        />
        {showProfileMenu && (
          <div className="absolute right-0 mt-0">
            <ModalProfileMenu />
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar;
