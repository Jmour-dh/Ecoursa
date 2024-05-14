import React,{Suspense} from 'react'
import { Outlet, useLocation  } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const  App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/register' || location.pathname === '/login';

  return (
    <>
    {!hideHeaderFooter && <Header />}
    <Suspense>
     <Outlet/>
    </Suspense>    
    {!hideHeaderFooter && <Footer />}
    </>
    
  )
}

export default App