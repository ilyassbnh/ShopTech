import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  return (
    <div className="page catalog-page">
      <h1 className="page-title">Catalog</h1>
      <div className="grid">
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;