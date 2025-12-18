import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={() => dispatch(toggleWishlist(product))}
        >
          <Heart size={20} fill={isInWishlist ? "red" : "none"} color={isInWishlist ? "red" : "currentColor"} />
        </button>
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <div className="rating">⭐⭐⭐⭐⭐</div>
        <button className="add-btn" onClick={() => dispatch(addToCart(product))}>
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;