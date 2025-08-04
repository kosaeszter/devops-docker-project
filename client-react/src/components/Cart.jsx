import '../styles/stylesMainPage.css';
import Products from './Products';
import { useState, useEffect } from 'react';

function Cart({ cart, setCart }) {
  const [cartItems, setCartItems] = useState([]);

   useEffect(() => {
    if (cart && cart.items) {
      const transformedCart = cart.items.map(item => ({
        id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.image,
        count: item.count,
      }));
      setCartItems(transformedCart);
    }
  }, [cart]);


 function handleProductRemove(productId) {
  const updatedCartItems = cartItems.filter(item => item.id !== productId);
  setCartItems(updatedCartItems);

  // Update main cart state in App
  const updatedCart = {
    ...cart,
    items: cart.items.filter(i => i.productId._id !== productId)
  };
  setCart(updatedCart);

  // Call backend API to delete from cart
  fetch(`/api/shopping/${productId}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        console.error('Failed to remove item from cart on server');
      }
    });
}

  return (
    <div className='section'>
      {cartItems && <Products data={cartItems} onProductRemoved={handleProductRemove} isCart={true} />}
    </div>
  );
}

export default Cart;