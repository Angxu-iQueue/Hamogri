import React from 'react'
import './Login.css'

export const Login = () => {
  return (
    <div>
        
        <div className="login">
            <div className="login-card">
            <h2>Login</h2>
            <form>
                <div class="login-form" >
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname"/><br/>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required/><br/>
                <label>
                <input type="checkbox" name="remember"/> Remember me
                </label>
                <button type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login