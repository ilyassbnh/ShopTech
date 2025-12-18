import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // On affiche seulement les 3 premiers produits pour la home
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="page home-page">
      <header className="hero">
        <div className="hero-content">
          <h1>THE CURATED & ELEGANT APPROACH</h1>
          <p>New collection available</p>
        </div>
      </header>
      
      <section className="featured">
        <div className="grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="discover-more">
            <h2>DISCOVER MORE PRODUCTS</h2>
            <p>Load more products from our exclusive collection.</p>
            <button className="white-btn">POP UP</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
