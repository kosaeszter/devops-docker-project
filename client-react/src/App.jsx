import './App.css';
import Products from './components/Products';
import Header from './components/Header';
import Cart from './components/Cart';
import Banner from './components/Banner';
import Form from './components/Form';
import OrderConfirmation from './components/OrderConfirmation';
import { useState, useEffect } from 'react';


function App() {

  //initialising states
  const [products, setProducts] = useState(null);
  const [view, setView] = useState('products');
  const [orderPlacement, setOrderPlacement] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const productList = await response.json();
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

  function handlePlaceOrder() {
    setOrderPlacement(true);
  }

  function handleCloseModal() {
    setOrderPlacement(false);
  }

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch('/api/shopping');
      const cartItems = await response.json();
      setCart(cartItems);
    }
    fetchCart();
  }, []);


  return (
    <div className='App'>
      <Header onCartButtonClick={handleCartButtonClick} view={view} />
      <Banner view={view} />
      {view === 'products' && products && <><Products data={products} isCart={false} /></>}
      {view === 'cart' && <div><Cart /><Form /><div className='order'><button id='order-button' onClick={handlePlaceOrder}>Place order</button></div>
        {orderPlacement && cart && <OrderConfirmation data={cart} onClose={handleCloseModal} />}</div>}
    </div>
  );
}

export default App;
