import '../styles/stylesMainPage.css';
import Products from './Products';
import { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    async function fetchCartItems() {
      const response = await fetch('/api/shopping');
      const cart = await response.json();
      setCartItems(cart);
    }
    fetchCartItems();
  }, []);



  function handleProductRemove(productId) { //gets id value from products (function is given as a props - child can give value to parent in this way)
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(p => p.id === productId);

    if (index !== -1) { // gives -1 if not found 
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
  }

  return (
    <div className='section'>
      {cartItems && <Products data={cartItems} onProductRemoved={handleProductRemove} isCart={true} />}
    </div>
  );
}

export default Cart;