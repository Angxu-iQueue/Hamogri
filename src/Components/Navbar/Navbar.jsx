import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link, useLocation } from "react-router-dom";
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { useAuth } from '../../Context/authContext';
import { auth } from '../../Config/Config';
import { useCart } from '../../Context/cartcontext';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const location = useLocation();
  const value = useAuth();
  const { getCount } = useCart();

  const doSignOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    // Set the menu state based on the current URL
    if (location.pathname.includes('/Products')) {
      setMenu('Products');
    } else if (location.pathname.includes('/Profile')) {
      setMenu('Profile');
    } else {
      setMenu('Home');
    }
  }, [location]);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Hamogri</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("Home")}>
          <Link style={{ color: '#000', textDecoration: 'none' }} to='/'>
            Home
          </Link>
          {menu === "Home" && location.pathname === '/' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Products")}>
          <Link style={{ color: '#000', textDecoration: 'none' }} to='/Products'>
            Products
          </Link>
          {menu === "Products" && location.pathname.includes('/Products') ? <hr /> : null}
        </li>
        {value.userLoggedIn && (
          <li onClick={() => setMenu("Profile")}>
            <Link style={{ color: '#000', textDecoration: 'none' }} to='/Profile'>
              Profile
            </Link>
            {menu === "Profile" && location.pathname === '/Profile' ? <hr /> : null}
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        {value.userLoggedIn ? (
          <Link style={{ color: '#000', textDecoration: 'none' }} to='/LoginSignup/Login'>
            <button onClick={doSignOut}>Logout</button>
          </Link>
        ) : (
          <Link style={{ color: '#000', textDecoration: 'none' }} to='/LoginSignup/Login'>
            <button>Login</button>
          </Link>
        )}
        <Link style={{ color: '#000', textDecoration: 'none' }} to='/cart'>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getCount()}</div>
      </div>
    </div>
  );
};

export default Navbar;
