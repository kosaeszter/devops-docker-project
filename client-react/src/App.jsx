import './App.css';
import Products from './components/Products';
import Header from './components/Header';
import Cart from './components/Cart';
import Banner from './components/Banner';
import Form from './components/Form';
import OrderConfirmation from './components/OrderConfirmation';
import { useState, useEffect } from 'react';


function App() {

  const [products, setProducts] = useState(null);
  const [view, setView] = useState('products');
  const [orderPlacement, setOrderPlacement] = useState(false);
  const [cart, setCart] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [unsortedProducts, setUnsortedProducts] = useState(null);


  //1 useeffect for 2 fetch
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const productList = await response.json();
      setProducts(productList);
      setUnsortedProducts(productList);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch('/api/shopping');
      const cartItems = await response.json();
      setCart(cartItems);
    }
    fetchCart();
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

  function handleSortClick() {
    if (!isSorted) {
      const productsAscending = products.toSorted((a, b) => {
        return parseInt(a.price) - parseInt(b.price)
      });
      setProducts(productsAscending);
    } else {
      const productsDescending = products.toSorted((a, b) => {
        return parseInt(b.price) - parseInt(a.price)
      });
      setProducts(productsDescending);
    }
    setIsSorted((prev) => {
      return !prev
    });
  }


  function handleBackClick() {
    setProducts(unsortedProducts);
  }

  function handlePlaceOrder() {
    setOrderPlacement(true);
  }

  function handleCloseModal() {
    setOrderPlacement(false);
  }





  return (
    <div className='App'>
      <Header onCartButtonClick={handleCartButtonClick} onSortClick={handleSortClick} onBackClick={handleBackClick} isSorted={isSorted} view={view} />
      <Banner view={view} />
      {view === 'products' && products && <><Products data={products} isCart={false} /></>}
      {view === 'cart' && <div><Cart /><Form /><div className='order'><button id='order-button' onClick={handlePlaceOrder}>Place order</button></div>
        {orderPlacement && cart && <OrderConfirmation onClose={handleCloseModal} />}</div>}
    </div>
  );
}

export default App;
