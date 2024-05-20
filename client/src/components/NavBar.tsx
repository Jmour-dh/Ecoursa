import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import profileImage from '../assets/images/profileImage.png';
import ModalProfileMenu from './ModalProfileMenu';

interface NavBarProps {
  toggleSidebar: () => void;
  status: string;
  setStatus: (status: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar, status, setStatus, theme, setTheme }) => {
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

  const getBorderColor = () => {
    switch (status) {
      case 'En ligne':
        return 'border-green-500';
      case 'Occupé':
        return 'border-orange-500';
      case 'Hors ligne':
        return 'border-black';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <nav className='bg-outer-space-300 h-[48px] flex items-center justify-between sticky top-0 w-full px-4'>
      <div>
        <GiHamburgerMenu onClick={toggleSidebar} className='cursor-pointer' />
      </div>
      <div ref={profileRef} className="relative">
        <img
          onClick={handleProfileClick}
          className={`w-[28px] h-[28px] rounded-full border-2 cursor-pointer ${getBorderColor()}`}
          src={profileImage}
          alt="profileImage"
        />
        {showProfileMenu && (
          <div className="absolute right-0 mt-0">
            <ModalProfileMenu status={status} setStatus={setStatus} theme={theme} setTheme={setTheme} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
