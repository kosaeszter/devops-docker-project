import '../styles/OrderConfirmation.css'
import { useState, useEffect } from 'react';

function OrderConfirmation(props) { //array of objects
    const cartItems = props.data;

    let sum = null; //is it ok like this???
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
                        <h2>{cartItem.title}<span className="price-small">{`${cartItem.price} Ft`}</span> </h2>
                    </div>
                ))}
                <h2 id='total-price'>Total Price: {`${sum} Ft`}</h2>
            </div>
        </div>
    )

}

export default OrderConfirmation;