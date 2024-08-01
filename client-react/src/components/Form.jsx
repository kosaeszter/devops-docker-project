import { useState } from 'react';
import Inputfields from './Inputfields';
import '../styles/styleForm.css';

function Form() {

    const inputfields = [
        { name: 'firstName', type: 'text', label: 'First name: ' },
        { name: 'middleName', type: 'text', label: 'Middle name: ' },
        { name: 'lastName', type: 'text', label: 'Last name: ' },
        { name: 'email', type: 'email', label: 'Email: ' },
        { name: 'shippingCountry', type: 'text', label: 'Shipping country: ' },
        { name: 'shippingZipCode', type: 'text', label: 'Shipping zip code: ' },
        { name: 'shippingCity', type: 'text', label: 'Shipping city: ' },
        { name: 'shippingAddress', type: 'text', label: 'Shipping address: ' },
        { name: 'invoiceCountry', type: 'text', label: 'Invoice country: ' },
        { name: 'invoiceZipCode', type: 'text', label: 'Invoice zip code: ' },
        { name: 'invoiceCity', type: 'text', label: 'Invoice city: ' },
        { name: 'invoiceAddress', type: 'text', label: 'Invoice address: ' },
    ]

    const [formValues, setFormValues] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        shippingCountry: '',
        shippingZipCode: '',
        shippingCity: '',
        shippingAddress: '',
        invoiceCountry: '',
        invoiceZipCode: '',
        invoiceCity: '',
        invoiceAddress: '',
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const httpResponse = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });
        await httpResponse.json();
        setSubmitted(true)
    }


    return (
        <div>
            <h2 id='form-title'>Please provide your shipping information</h2>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {inputfields.map((inputfield, index) => (
                    <Inputfields key={index} name={inputfield.name} type={inputfield.type} label={inputfield.label} onChange={handleChange} />
                ))}
                <button type='submit'className="submit-button">Submit profile</button>
            </form>
        </div>
        </div>
    )
}

export default Form;