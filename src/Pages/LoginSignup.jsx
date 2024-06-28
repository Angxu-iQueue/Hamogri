
import Login from '../Components/Form/Login'
import Signup from "../Components/Form/Signup"
import './Css/LoginSignup.css'
import { useNavigate, useParams } from "react-router-dom"



const LoginSignup = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const setFlag = (flag) => {
    navigate(`/LoginSignup/${flag}`);
  };


  return (
    <div className="background">
  <div>
    {type === "Login" ? <Login setFlag = {setFlag} /> : <Signup setFlag = {setFlag} />}
  </div>
  </div>
  )
}
  

export default LoginSignup