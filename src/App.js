import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import Cart  from './Pages/Cart';
import AdminDashboard from './Pages/Admin';
import LoginSignup from './Pages/LoginSignup';

function App() {
  
 
  return (
    
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Products' element={<Products/>}>
          <Route path=':productId' element={<Products/>}/>
        </Route>

        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/LoginSignup/:type' element={<LoginSignup />} />
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Admin" element={<AdminDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
