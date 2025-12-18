import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';

const CartSidebar = () => {
  const { cartItems, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {isOpen && <div className="overlay" onClick={() => dispatch(toggleCart())}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Welcome</h2>
          <button onClick={() => dispatch(toggleCart())} className="close-btn"><X /></button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price} each</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                  </div>
                </div>
                <div className="item-actions">
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="remove-btn">
                        <X size={16} />
                    </button>
                    <p className="item-total">${item.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="subtotal">
            <span>SubTotal :</span>
            <span className="amount">${total}</span>
          </div>
          <button className="checkout-btn">CHECKOUT</button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;