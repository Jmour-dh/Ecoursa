import React,{Suspense} from 'react'
import { Outlet, useLocation  } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AuthProvider from './authProvider/AuthProvider'

const  App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/register' || location.pathname === '/login';

  return (
    <>
    <AuthProvider>
    {!hideHeaderFooter && <Header />}
    <Suspense>
     <Outlet/>
    </Suspense>    
    {!hideHeaderFooter && <Footer />}
    </AuthProvider>
    </>
    
  )
}

export default App