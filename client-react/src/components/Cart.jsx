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

return (
<div className='section'>
    {cartItems && <Products data={cartItems} isCart={true}/>}
</div>
);
}

export default Cart;