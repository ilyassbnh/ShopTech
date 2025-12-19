import { useEffect } from 'react'; // 1. Importer useEffect
import { useSelector } from 'react-redux'; // 2. Importer useSelector pour lire les données
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalogue'; // Attention à l'orthographe (Catalogue vs Catalog)
import Wishlist from './pages/Wishlist';
import CartSidebar from './components/CartSidebar';

function App() {
  // 3. Récupérer les données du store Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // 4. "Surveiller" le panier : Sauvegarder dès qu'il change
  useEffect(() => {
    localStorage.setItem('shoptech_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 5. "Surveiller" la wishlist : Sauvegarder dès qu'elle change
  useEffect(() => {
    localStorage.setItem('shoptech_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  return (
    <div className="app">
      <Navbar />
      <CartSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;