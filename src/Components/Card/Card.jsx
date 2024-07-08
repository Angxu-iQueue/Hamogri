import React, { useEffect, useState } from 'react';
import { db } from '../../Config/Config';
import { collection, getDocs } from "firebase/firestore";
import "./Card.css";
import { useCart } from '../../Context/cartcontext';
import product from '../Assets/product.png';

function Card() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const productCollectionRef = collection(db, "Product");
  const { addProduct } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching products: ", error.message);
      }
    };
    getProducts();
    // eslint-disable-next-line
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((item) =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
     
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      
        {filteredProducts.map(item => (
          <div key={item.id} className="backdrop">
            <div className="product-card">
              <img className="p-photo" src={product} alt="Product" />
              <p className='p-name'>{item.item_name}</p>
              <p className='p-price'>₹{item.item_price}</p>
              <button className='p-cart' onClick={() => addProduct(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    
  );
}

export default Card;
