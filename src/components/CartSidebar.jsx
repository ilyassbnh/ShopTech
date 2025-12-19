import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';
// 1. Import motion and AnimatePresence
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = () => {
  const { cartItems, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    // 2. AnimatePresence allows animation when component is removed from DOM
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Animation (Fade In) */}
          <motion.div 
            className="overlay" 
            onClick={() => dispatch(toggleCart())}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Sidebar Animation (Slide from Right) */}
          <motion.div 
            className="sidebar"
            initial={{ x: '100%' }} // Start off-screen right
            animate={{ x: 0 }}      // Slide to position
            exit={{ x: '100%' }}    // Slide back out
            transition={{ type: "spring", stiffness: 300, damping: 30 }} // Bouncy effect
            // We force style here to override CSS 'right: -450px' if necessary
            style={{ right: 0 }} 
          >
            <div className="sidebar-header">
              <h2>Welcome</h2>
              <button onClick={() => dispatch(toggleCart())} className="close-btn"><X /></button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-msg">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  // Optional: Animate items appearing in cart
                  <motion.div 
                    key={item.id} 
                    className="cart-item"
                    layout // Smoothly adjusts layout when items are deleted
                  >
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
                  </motion.div>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;