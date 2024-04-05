import React, { useState } from 'react'
import './navbar.css'
import { Link } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';

const Navbar = () => {

    const[menu,setMenu] = useState("Home");


  return (
    <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>Hamogri</p>
        </div>
        <ul className="nav-menu">
          <li onClick={()=>{setMenu("Home")}}><Link style={{color:'#000' ,textDecoration: 'none'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Products")}}><Link style={{color:'#000' ,textDecoration: 'none'}} to='/Products'>Products</Link>{menu==="Products"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Categories")}}><Link style={{color:'#000' ,textDecoration: 'none'}} to='/Categories'>Categories</Link>{menu==="Categories"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("Profile")}}><Link style={{color:'#000' ,textDecoration: 'none'}} to='/Profile'>Profile</Link>{menu==="Profile"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
          <Link style={{color:'#000' ,textDecoration: 'none'}} to='/login'><button>Login</button></Link>
          <Link style={{color:'#000' ,textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt=""/></Link>
          <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar