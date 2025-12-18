import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const items = useSelector(state => state.wishlist.items);

  return (
    <div className="page wishlist-page">
      <h1 className="page-title">My Wishlist</h1>
      {items.length === 0 ? <p>No favorites yet.</p> : (
        <div className="grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;