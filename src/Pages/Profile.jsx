import React, { useEffect, useState } from "react";
import { auth, db } from "../Config/Config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Css/Profile.css";

function Profile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "User_data", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        navigate("/Login");
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "User_data", user.uid);
      try {
        await updateDoc(userDoc, {
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          phone: userData.phone
        });
        toast.success("Profile updated successfully!", {
          position: "top-center",
        });
      } catch (error) {
        console.error("Error updating profile: ", error.message);
        toast.error("Error updating profile.", {
          position: "top-center",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h3>Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            readOnly
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
