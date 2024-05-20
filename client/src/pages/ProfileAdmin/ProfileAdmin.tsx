import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const ProfileAdmin: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('En ligne');
  const [theme, setTheme] = useState<string>('Clair');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <section className='flex w-screen h-screen'>
      {isSidebarVisible && (
        <div className='w-fill h-full'>
          <SideBar isVisible={isSidebarVisible} />
        </div>
      )}
      <div className='flex-1 w-full'>
        <NavBar status={status} setStatus={setStatus} theme={theme} setTheme={setTheme} toggleSidebar={toggleSidebar} />
      </div>
    </section>
  );
}

export default ProfileAdmin;
