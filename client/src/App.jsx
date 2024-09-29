
import { Outlet } from 'react-router-dom'
import './App.css'
import NavLinks from './components/NavLinks'
import Footer from './components/Footer'
import RefreshHandler from './components/RefreshHandler'
import { useState } from 'react'
function App() {
 const [isAuthenticated,setIsAuthenticated] = useState(false);
  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <NavLinks admin={'Admin'} logo={"e-commerce"} home={"Home"} products={'Products'} signIn={'SignIn'} Addcart={<i className="fa-solid fa-cart-shopping"></i>} />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
