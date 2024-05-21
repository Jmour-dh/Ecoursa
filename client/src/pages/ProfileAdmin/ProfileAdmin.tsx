import React, { Suspense, useState } from 'react';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { Outlet } from 'react-router-dom';

const ProfileAdmin: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('En ligne');
  const [theme, setTheme] = useState<string>('Clair');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <section className='flex flex-col w-screen h-screen'>
  <div className='flex-1 flex'>
    {isSidebarVisible && (
      <div className='w-fill h-full'>
        <SideBar isVisible={isSidebarVisible} />
      </div>
    )}
    <div className='flex-1 w-full flex flex-col'>
      <NavBar status={status} setStatus={setStatus} theme={theme} setTheme={setTheme} toggleSidebar={toggleSidebar} />
      <div >
        <Suspense fallback={<div>Chargement...</div>}>
          <Outlet />  
        </Suspense>
      </div>
    </div>
  </div>
</section>

  );
}

export default ProfileAdmin;
