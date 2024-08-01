import '../styles/OrderConfirmation.css'
import { useState, useEffect } from 'react';

function OrderConfirmation(props) {
    const cartItems = props.data;

    //derived state 
    let sum = null;
    for (const item of cartItems) {
        sum += parseInt(item.price);
    }

    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        async function fetchCustomer() {
            const response = await fetch('/api/customers');
            const customerData = await response.json();
            setCustomer(customerData);
        }
        fetchCustomer();
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={props.onClose}>x</span>
                <h1 id='order-message'> Thank you for your order, <span className="name">{customer ? `${customer.firstName}` : ''}</span>!</h1>
                <p id='items'>Your items:</p>
                {cartItems.map((cartItem, index) => (
                    <div key={index}>
                        <h3 className='cart-items'>{cartItem.title}<span className="price-small">{`${cartItem.price} Ft`}</span> </h3>
                    </div>
                ))}
                <p id='total-price'>Total Price: {`${sum} Ft`}</p>
            </div>
        </div>
    )

}

export default OrderConfirmation;