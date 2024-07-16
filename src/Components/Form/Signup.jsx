import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState , useEffect , useRef } from "react";
import { auth, db } from "../../Config/Config";
import { setDoc, doc, GeoPoint } from "firebase/firestore";
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
  const [location, setLocation] = useState(null); // GeoPoint state for storing latitude and longitude
  const mapRef = useRef(null);
  const locationInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 26.11, lng: 91.70 },
        zoom: 8,
      });

      const marker = new window.google.maps.Marker({
        map: map,
        draggable: true,
      });

      map.addListener("click", (event) => {
        marker.setPosition(event.latLng);
        setLocation(new GeoPoint(event.latLng.lat(), event.latLng.lng()));
      });

      const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          map.setCenter(place.geometry.location);
          map.setZoom(14);
          marker.setPosition(place.geometry.location);
          setLocation(new GeoPoint(place.geometry.location.lat(), place.geometry.location.lng()));
        }
        if (place.formatted_address) {
          setAddress(place.formatted_address);
        }
      });
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      if (user) {

        const geoPoint = new GeoPoint(location.latitude, location.longitude);


        await setDoc(doc(db, "User_data", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          address: address,
          role: role,
          location: geoPoint,
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
      <div className="col-left">
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

      </div>
      <div className="col-right"></div>
      <div className="mb-3">
            <label>Select Location</label>
            <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
      
      </div>
      <div className="bottom">
      <p className="forgot-password">
        <button className="signup-btn" type="submit">Sign Up</button>
      </p>
      <p className="forgot-password">
        Already registered? <button className="signup-btn" type="button" onClick={() => setFlag("Login")}>Login</button>
      </p>
      </div>
      
    </form>
    </div>
    </div>
  );
}

export default Signup;
