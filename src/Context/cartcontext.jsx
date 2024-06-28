import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {doc, getDoc} from 'firebase/firestore';
import {auth,db} from "../Config/Config";


const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // Retrieve initial cart state from localStorage
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPhone, setUserPhone] = useState('');

    useEffect(() => {
        // Fetch user data from Firestore and set userName
        const fetchUserData = async () => {
            try {
                // Get current authenticated user
                const user = auth.currentUser;
                if (user) {
                    const userDoc = doc(db, "User_data", user.uid);
                    const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUserName((userData.firstName) + (userData.lastName));
              setUserAddress(userData.address); // Assuming you have address and phone stored in Firestore too
              setUserPhone(userData.phone);
            } else {
                console.log('No such document!');
              }
            } else {
              console.log('No user logged in');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData();
      }, []); // Empty dependency array ensures this effect runs once on component mount
    
    

    useEffect(() => {
        // Save cart state to localStorage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addProduct = (product) => {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Product already exists in cart, update quantity
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
            toast.success("Added to cart successfully", {
                position: "top-center",
            });
        } else {
            // Product does not exist in cart, add it
            setCart([...cart, { ...product, quantity: 1 }]);
            toast.success("Added to cart successfully", {
                position: "top-center",
            });
        }
    };

    const removeProduct = (productId) => {
        const updatedCart = cart.filter(product => product.id !== productId);
        setCart(updatedCart);
        toast.success("Removed from cart successfully", {
            position: "top-center",
        });
    };

    const clearCart = () => {
        setCart([]);
      };

      const getCount = () => {
        const totalItems = cart.reduce((acc, product) => acc + product.quantity, 0);
        return totalItems;
    };

    const value = {
        cart,
        addProduct,
        removeProduct,
        getCount,
        clearCart,
        userName,
        setUserName,
        userAddress,
        setUserAddress,
        userPhone,
        setUserPhone,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
