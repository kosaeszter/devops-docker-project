import '../styles/stylesMainPage.css';
import Products from './Products';
import { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState(null);

//container component - has the logic 
//display component - does not handle the business logic, easily changeable
//enough 1 fetch in app - better option components can be changeable more easily 

  useEffect(() => {
    async function fetchCartItems() {
      const response = await fetch('/api/shopping');
      const cart = await response.json();
      
// Transform cart items to match Products component structure
const transformedCart = cart.items.map(item => ({
  id: item.productId._id, // Needed for Products component
  name: item.productId.name,
  price: item.productId.price,
  image: item.productId.image,
  // count: item.count, // uncomment if you want to use
}));

setCartItems(transformedCart);
}

fetchCartItems();
}, []);


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