import React,{Suspense} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const  App: React.FC = () => {
  return (
    <>
    <Header/>
    <Suspense>
     <Outlet/>
    </Suspense>    
    <Footer/>
    </>
    
  )
}

export default App