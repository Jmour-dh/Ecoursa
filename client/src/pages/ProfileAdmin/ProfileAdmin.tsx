import React from 'react'
import Logout from '../../components/Logout'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'

const ProfileAdmin: React.FC = () => {
  return (
    <section className='flex w-screen h-screen'>
      <div className='w-fill h-full'>
        <SideBar/>
      </div>
      <div className='flex-1 w-full'>
        <NavBar/>
      </div>
    </section>
  )
}

export default ProfileAdmin