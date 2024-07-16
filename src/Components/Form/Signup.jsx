import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../Config/Config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup({ setFlag }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "User_data", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          address: address,
          role: role,
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/Login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  
  };
  const handleCheckboxChange = (e) => {
    setIsSeller(e.target.checked);
    setRole(e.target.checked ? "Admin" : "user");
  };
  

  return (
  <div className="signup">
    <div className="signup-card">
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>
  <div className="name">
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
  </div>  
      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Location</label>
        <input
          type="text"
          className="form-control"
          placeholder="location"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="">
        <label>Register as seller</label>
        <input
          type="checkbox"
          className="form-control"
          placeholder="checkbox"
          onChange={handleCheckboxChange}
          checked={isSeller}
        />
      </div>

      <p className="forgot-password text-right">
        <button className="signup-btn" type="submit">Sign Up</button>
      </p>
      <p className="forgot-password text-right">
        Already registered? <button className="signup-btn" type="button" onClick={() => setFlag("Login")}>Login</button>
      </p>
    </form>
    </div>
    </div>
  );
}

export default Signup;
