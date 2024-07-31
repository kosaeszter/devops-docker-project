import './App.css'
import Products from './components/Products';
import Header from './components/Header';
import Cart from './components/Cart';
import Banner from './components/Banner';
import { useState, useEffect } from 'react'


function App() {

  //initialising state
  const [products, setProducts] = useState(null);
  const [view, setView] = useState('products');

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const productList = await response.json();
      console.log(productList);
      setProducts(productList);
    }
    fetchProducts();
  }, []);

  function handleCartButtonClick() {
    setView((prev) => {
      if (prev === 'cart') {
        return 'products'
      } else {
        return 'cart'
      }
    }
    );
  }

  return (
    <div className='App'>
      <Header onCartButtonClick={handleCartButtonClick} view={view} />
      <Banner view={view} />
      {view === 'products' && products && <><Products data={products} isCart={false} /></>}
      {view === 'cart' && <Cart />}
    </div>
  );
}

export default App;
