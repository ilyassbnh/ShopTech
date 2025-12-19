import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Catalog = () => {
  // 1. Fonction pour découper le tableau en morceaux de 5 items
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  // On crée des groupes de 5 produits (4 pour la grille, 1 pour la grande image)
  const productChunks = chunkArray(products, 5);

  return (
    <div className="page catalog-page">
      <h1 className="page-title">Catalog</h1>

      <div className="catalog-pattern-container">
        {productChunks.map((chunk, index) => {
          // On sépare le groupe de 5 : les 4 premiers et le 5ème (le grand)
          const smallItems = chunk.slice(0, 4);
          const bigItem = chunk[4];
          
          // Est-ce une ligne paire ? (Pour alterner gauche/droite)
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              className={`pattern-row ${isEven ? 'row-normal' : 'row-reverse'}`}
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* BLOC A : La Grille de 4 items */}
              <div className="quad-block">
                {smallItems.map(product => (
                  <div key={product.id} className="small-cell">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* BLOC B : Le Grand Item Unique (s'il existe) */}
              {bigItem && (
                <div className="single-block">
                  <ProductCard product={bigItem} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;