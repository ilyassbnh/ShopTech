import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/slices/cartSlice';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  
  // 1. On garde cartCount pour le petit badge rouge (nombre d'items)
  const cartCount = useSelector(state => state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  
  // 2. NOUVEAU : On calcule le prix total pour l'afficher à côté du texte "Cart"
  const cartTotal = useSelector(state => state.cart.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));

  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${isHomePage ? '' : 'nav-dark'}`}>
      <Link to="/" className="logo">
        <img src={logoImg} alt="ShopTech Logo" className="logo-image" />
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </div>

      <div className="nav-icons">
        <Link to="/wishlist" className="icon-wrapper">
          <Heart size={22} color='grey'/>
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>
        
        <div className="icon-wrapper" onClick={() => dispatch(toggleCart())}>
          <ShoppingBag size={22} />
          
          {/* 3. LIGNE MODIFIÉE : On affiche cartTotal au lieu de cartCount */}
          <span style={{marginLeft: '8px', fontSize: '0.9rem', fontWeight: '500'}}>
            Cart (${cartTotal})
          </span>

          {/* On garde le badge pour le nombre d'articles si tu le souhaites */}
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;