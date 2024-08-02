import '../styles/stylesMainPage.css';
import Products from './Products';
import { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState(null);

//container component - has the logic 
//display component - does not handle th ebusiness logic, easily changeable
  //enough 1 fetch in app - better optionm components can be chnageable more easily 
  useEffect(() => {
    async function fetchCartItems() {
      const response = await fetch('/api/shopping');
      const cart = await response.json();
      console.log(cart);
      setCartItems(cart);
    }
    fetchCartItems();
  }, []);
// filter - dependency array gets the state 

  function handleProductRemove(productId) { //gets id value from products (function is given as a props - child can give value to parent in this way)
    const updatedCart = [...cartItems];
    const index = updatedCart.findIndex(p => p.id === productId);

    if (index !== -1) { // gives -1 if not found 
      updatedCart.splice(index, 1);
    }
    console.log(updatedCart);
    setCartItems(updatedCart);
  }

//state is immutable
//controlled component - thinking in react 
// server - req - http 


  return (
    <div className='section'>
      {cartItems && <Products data={cartItems} onProductRemoved={handleProductRemove} isCart={true} />}
    </div>
  );
}

export default Cart;