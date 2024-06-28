import React, {useState} from 'react';
import './Login.css'
import { auth } from "../../Config/Config";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function Login({ setFlag }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in Successfully");
      toast.success("Logged in Successfully", {
        position: "top-center",
      });
      navigate('/');
      
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div>
        
        <div className="login">
            <div className="login-card">
            <h2>Namaskar Grahak</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-form" >
                <label name="uname"><b>Email</b></label>
                <input 
                  className='login-input'
                  type="text" 
                  placeholder="Enter email" 
                  name="uname"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <label name="psw"><b>Password</b></label>
                <input 
                  className='login-input'
                  type="password" 
                  placeholder="Enter Password" 
                  name="psw"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                /><br/>
                <button className='login-btn' type="submit">Login</button>
                </div>
            </form>
            <p className="forgot-password">
            New user?<br/> <button className='login-btn' type="button" onClick={() => setFlag("Signup")}>Create New Account</button>
            </p>
            </div>
        </div>
    </div>
  );
}

export default Login;