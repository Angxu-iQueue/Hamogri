import React, { useEffect, useState } from 'react';
import { db } from '../Config/Config';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import '../Pages/Css/Admin.css';
import {toast} from "react-toastify";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ item_name: '', item_price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const productCollectionRef = collection(db, 'Product');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching products: ', error.message);
      }
    };
    getProducts();
    //eslint-disable-next-line
  }, []);

  const addProduct = async () => {

    if (!newProduct.item_name || !newProduct.item_price) {
      toast.alert('Please enter product name and price.');
      return;
    }

    try {
      await addDoc(productCollectionRef, newProduct);
      setNewProduct({ item_name: '', item_price: '' });
      const data = await getDocs(productCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error adding product: ', error.message);
    }
  };

  const updateProduct = async (id) => {
    const productDoc = doc(db, 'Product', id);
    try {
      await updateDoc(productDoc, editingProduct);
      setEditingProduct(null);
      const data = await getDocs(productCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error updating product: ', error.message);
    }
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'Product', id);
    try {
      await deleteDoc(productDoc);
      const data = await getDocs(productCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error deleting product: ', error.message);
    }
  };
//rendered component

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="add-product">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.item_name}
          onChange={(e) => setNewProduct({ ...newProduct, item_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={newProduct.item_price}
          onChange={(e) => setNewProduct({ ...newProduct, item_price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={newProduct.item_description}
          onChange={(e) => setNewProduct({ ...newProduct, item_description: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div className="product-list">
      <div className="product-header">
          <p>Name</p>
          <p>Price</p>
          <p>Description</p>
          <p>Actions</p>
        </div>
        {products.map((item) => (
          <div key={item.id} className="product-item">
            {editingProduct?.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editingProduct.item_name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, item_name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.item_price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, item_price: e.target.value })}
                />
                <input
                  type="text"
                  value={editingProduct.item_description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, item_description: e.target.value })}
                />
                <button onClick={() => updateProduct(item.id)}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{item.item_name}</p>
                <p>₹{item.item_price}</p>
                <p>{item.item_description}</p>
                <div className="action-buttons">
                  <button onClick={() => setEditingProduct(item)}>Edit</button>
                  <button onClick={() => deleteProduct(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
