import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../Context/cartcontext';
import { useAuth } from '../Context/authContext/index';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../Components/Assets/logo.png';
import "./Css/Cart.css";

const Cart = () => {
  const { cart, removeProduct, getCount, clearCart, userName, userAddress, userPhone } = useCart();
  const { userLoggedIn } = useAuth();
  const history = useNavigate();

  const checkout = () => {
    if (userLoggedIn) {
      if (cart.length > 0) {
        generateReceipt();
        clearCart();
        toast.success('Checkout successful! Thank you for your purchase.');
      } else {
        toast.error('Your cart is empty.');
      }
    } else {
      
      toast.error('You need to be logged in to checkout.');
      
      setTimeout(() => {
        history('/LoginSignup/Login');
        }, 2000);
    }
  };

  // PDF generation
  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'png', 75, 5, 10, 10);
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.text('Hamogri', 90, 14);
    doc.setFontSize(20);
    doc.text('Receipt', 15, 20);
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`Name: ${userName}`, 15, 30);
    doc.text(`Phone: ${userPhone}`, 15, 40);
    doc.text(`Address: `, 15, 50);
    const addressLines = doc.splitTextToSize(userAddress, 60);
    addressLines.forEach((line, index) => {
      doc.text(line, 20, 60 + index * 10);
    });

    const columns = ['Item', 'Category', 'Quantity', 'Price'];
    const rows = cart.map(product => [
      product.item_name,
      product.item_category,
      product.quantity,
      `Rs${Number(product.item_price).toFixed(2)}`,
    ]);

    const totalPrice = cart.reduce((acc, product) => acc + Number(product.item_price) * product.quantity, 0);
    rows.push(['', '', '\n Total Price', { content: `\n Rs ${totalPrice.toFixed(2)}` }]);

    doc.autoTable({
      startY: 120,
      head: [columns],
      body: rows,
    });

    doc.save('receipt.pdf');
  };

  const grandTotal = cart.reduce((acc, product) => acc + (Number(product.item_price) * product.quantity), 0);

  return (
    <div className='cart-container'>
      <h2>Cart ({getCount()})</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="cart-item-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id}>
                <td>{product.item_name}</td>
                <td>{product.item_description}</td>
                <td>₹{product.item_price}</td>
                <td>{product.quantity}</td>
                <td className="cart-item-actions">
                  <button className="remove-item" onClick={() => removeProduct(product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="grand-total">Grand Total: ₹{grandTotal.toFixed(2)}</div>
      {cart.length > 0 && (
        <div className="checkout-container">
          <button className="checkout" onClick={checkout}>Checkout</button>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Cart;
