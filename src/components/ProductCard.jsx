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

  // Fonction pour gérer le clic sur la carte
  const handleCardClick = (e) => {
    // Si on clique sur le coeur, on ne veut pas ajouter au panier
    if (e.target.closest('.wishlist-icon-btn')) return;
    
    // Sinon, on ajoute au panier
    dispatch(addToCart(product));
  };

  return (
    <div 
      className={`product-card ${isCatalogPage ? 'catalog-mode' : ''}`}
      onClick={handleCardClick} // Toute la carte devient cliquable
    >
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        
        {/* Sur la Home uniquement : Boutons au survol de l'image */}
        {!isCatalogPage && (
          <div className="hover-actions">
            <button className="quick-look-btn">Quick Look</button>
            {/* Le clic sur le coeur est géré dans handleCardClick pour ne pas ajouter au panier */}
            <button 
              className={`wishlist-icon-btn ${isInWishlist ? 'active' : ''}`}
              onClick={() => dispatch(toggleWishlist(product))}
            >
              <Heart size={18} fill={isInWishlist ? "black" : "none"} color={isInWishlist ? "black" : "currentColor"} />
            </button>
          </div>
        )}
      </div>

      <div className="card-info">
        <h3>{product.name}</h3>
        
        {/* Sur le catalogue : juste le prix, pas d'étoiles */}
        {isCatalogPage ? (
          <span className="price">${product.price}</span>
        ) : (
          /* Sur la Home : Étoiles + Swap Prix/"ADD TO CART" */
          <>
            <div className="rating">★★★★★</div>
            <div className="price-cart-switch">
              <span className="price">${product.price}</span>
              {/* Ce bouton est visuel, le clic est géré par le div parent */}
              <span className="add-cart-text-btn">ADD TO CART</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;