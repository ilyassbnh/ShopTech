import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const location = useLocation();
  const isCatalogPage = location.pathname === '/catalog';

  const handleCardClick = (e) => {
    // Empêche l'ajout au panier si on clique sur le coeur
    if (e.target.closest('button')) return;
    dispatch(addToCart(product));
  };

  return (
    <div 
      className={`product-card ${isCatalogPage ? 'catalog-mode' : ''}`}
      onClick={handleCardClick}
    >
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        
        {/* MODE HOME : Quick Look + Coeur en bas */}
        {!isCatalogPage && (
          <div className="hover-actions">
            <button className="quick-look-btn">Quick Look</button>
            <button 
              className={`wishlist-icon-btn ${isInWishlist ? 'active' : ''}`}
              onClick={() => dispatch(toggleWishlist(product))}
            >
              <Heart size={18} fill={isInWishlist ? "black" : "none"} color={isInWishlist ? "black" : "currentColor"} />
            </button>
          </div>
        )}

        {/* MODE CATALOGUE : Coeur seul (Nouveau) */}
        {isCatalogPage && (
          <button 
            className={`catalog-heart-btn ${isInWishlist ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); // Important : ne pas déclencher le clic de la carte
              dispatch(toggleWishlist(product));
            }}
          >
             <Heart size={20} fill={isInWishlist ? "black" : "none"} color={isInWishlist ? "black" : "currentColor"} />
          </button>
        )}
      </div>

      <div className="card-info">
        <h3>{product.name}</h3>
        
        {isCatalogPage ? (
          <span className="price">${product.price}</span>
        ) : (
          <>
            <div className="rating">★★★★★</div>
            <div className="price-cart-switch">
              <span className="price">${product.price}</span>
              <span className="add-cart-text-btn">ADD TO CART</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;