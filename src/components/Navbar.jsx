import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react'; 
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/slices/cartSlice';

// 1. On importe le logo depuis le dossier assets
// Le chemin "../assets" signifie "remonter d'un dossier, puis aller dans assets"
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0));
  const wishlistCount = useSelector(state => state.wishlist.items.length);

  return (
    <nav className="navbar">
      {/* 2. Section Logo modifiée pour utiliser l'image */}
      <Link to="/" className="logo">
        <img 
          src={logoImg} 
          alt="ShopTech Logo" 
          className="logo-image" 
        />
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
      </div>

      <div className="nav-icons">
        <Link to="/wishlist" className="icon-wrapper">
          <Heart size={22} color='grey' />
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </Link>
        <div className="icon-wrapper" onClick={() => dispatch(toggleCart())}>
          <ShoppingBag size={22} />
          <span style={{marginLeft: '8px', fontSize: '0.9rem'}}>Cart (${cartCount})</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;