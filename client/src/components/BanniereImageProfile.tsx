import React, { useContext } from 'react'
import banniereProfileIamge from "../assets/images/banniere_image_profile.png"
import { AuthContext } from "../context";

const BanniereImageProfile : React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Chargement...</div>;
  }

  const { user } = authContext;
  
  return (
    <section className='w-full relative'>
      <div className="w-full h-[350px] relative">
        <img src={banniereProfileIamge} alt="Banniere Image Profile" className="w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[350px] bg-black opacity-60 flex flex-col items-start justify-center  pl-40">
        <h1 className="text-5xl top-[50%] font-bold text-white">Bienvenue <span className="text-blue-500">{user?.firstname} {user?.lastname}</span> </h1>
        {user?.is_admin ? (<p className="text-lg  text-white">Explorez les fonctionnalités avancées pour gérer efficacement <br/>votre contenu et votre communauté.</p>): (<p className="text-lg  text-white">Continue tes formations là où tu les as laissées.</p>) }
        
      </div>
      
    </section>
  )
}

export default BanniereImageProfile
