import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../Config/Config";
import {doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
  }


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
        //eslint-disable-next-line
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
            const role = await fetchUserRole(user.uid);
            setUserRole(role);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setUserRole(null);
        }
        setLoading(false);
    }
    
    async function fetchUserRole(uid) {
        try {
            const userDoc = doc(db, 'User_data', uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                return userSnapshot.data().role;
            } else {
                console.error('User document not found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user role: ', error.message);
            return null;
        }
    }

    const value = {
        currentUser,
        userLoggedIn,
        userRole,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      );
}
