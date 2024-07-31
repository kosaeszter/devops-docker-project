
function createElement(elementName, parent, options) {
    const element = document.createElement(elementName);
    parent.appendChild(element);

    for (const [key, value] of Object.entries(options)) {
        if (key === 'class') {
            if (Array.isArray(value)) {
                value.forEach(className => element.classList.add(className));
            } else {
                element.classList.add(value);
            }
        } else if (key === 'id') {
            element.id = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'type') {
            element.type = value;
        } else if (key === 'method') {
            element.method = value;
        } else if (key === 'htmlFor') {
            element.htmlFor = value;
        } else if (key === 'value') {
            element.value = value;
        } else if (key === 'name') {
            element.name = value;
        } else if (key === 'required') {
            element.required = value;
        } else if (key === 'src') {
            element.src = value;
        } else if (key === 'style.width') {
            element.style.width = value;
        }
    }
    return element;
}

async function displayCart(root) {
    const title = createElement('h2', root, { class: 'title', textContent: 'YOUR SHOPPING CART' });
    const shoppingCartDiv = createElement('div', root, { class: 'section', id: 'products-container' });
    const shoppingCart = await getShoppingCart();
    console.log(shoppingCart);

    shoppingCart.forEach(function (product) {
        const productCard = createElement('div', shoppingCartDiv, { class: 'card' });
        const cardContent = createElement('div', productCard, {class: 'content'});
        createProductCard(product, cardContent);
        const button = createElement('button', productCard, { textContent: 'Drop from cart', id: product.title });
    });


    shoppingCartDiv.addEventListener('click', async function (event) {
        const buttonID = event.target.id; //same as product title
        console.log(buttonID);
        const clickedProductId = findClickedProduct(shoppingCart, buttonID); //shoppingcart
        console.log(clickedProductId); // have a product id 
        await deleteProductById(clickedProductId);
    });
}

async function deleteProductById(id) {
    const httpResponse = await fetch(`/api/shopping/${id}`,
        {
            method: 'DELETE'
        }
    );

    const deletedProduct = await httpResponse.json();
    console.log('Deleted Product:', deletedProduct);
}

function findClickedProduct(products, buttonID) {
    let clickedProductId = '';
    for (const product of products) {
        if (product.title === buttonID) {
            clickedProductId = product.id;
        }
    }
    return clickedProductId;
}

function createProductCard(product, parentElement) { //1 object
    const image = createElement('img', parentElement, { src: product['image'], 'style.width': '100%' });
    const title = createElement('h1', parentElement, { textContent: product.title });
    const price = createElement('p', parentElement, { class: 'price', textContent: `price: ${product.price} Ft,` });
    const category = createElement('p', parentElement, { class: 'category', textContent: ` category: ${product.category}` });
    const rating = createElement('p', parentElement, { class: 'rating', textContent: `rating: ${product.rating}` });
    const description = createElement('p', parentElement, { class: 'description', textContent: product.description });
    // ide kell meg count
}

async function getShoppingCart() {
    const httpResponse = await fetch('/api/shopping')
    const responseBody = await httpResponse.json();
    return responseBody;
}

function createForm(parentElement) {
    const title = createElement('h2', parentElement, { class: ['list-group-flush', 'list-group', 'title'], textContent: 'PROVIDE SHIPPING INFORMATION: ', id: 'form-title' })
    const form = createElement('form', parentElement, { type: 'form', id: 'user-data', method: 'get' });

    const firstNameLabel = createElement('label', form, { class: ['form'], htmlFor: 'first-name', textContent: 'First name: ' });
    const firstName = createElement('input', firstNameLabel, { class: ['form-input'], type: 'text', name: 'firstName', id: 'first-name' });

    const middleNameLabel = createElement('label', form, { class: ['form'], htmlFor: 'middle-name', textContent: 'Middle name: ' });
    const middleName = createElement('input', middleNameLabel, { class: ['form-input'], type: 'text', name: 'middleName', id: 'middle-name' })

    const lastNameLabel = createElement('label', form, { class: ['form'], htmlFor: 'last-name', textContent: 'Last name: ' });
    const lastName = createElement('input', lastNameLabel, { class: ['form-input'], type: 'text', name: 'lastName', id: 'last-name' });

    const emailLabel = createElement('label', form, { class: ['form'], htmlFor: 'email', textContent: 'Email: ' });
    const email = createElement('input', emailLabel, { class: ['form-input'], type: 'email', name: 'email', id: 'email', required: 'true' });

    const shippingCountryLabel = createElement('label', form, { class: ['form'], htmlFor: 'shipping-country', textContent: 'Shipping Country: ' });
    const shippingCountry = createElement('input', shippingCountryLabel, { class: ['form-input'], type: 'text', name: 'shippingCountry', id: 'shipping-country' });

    const shippingZipCodeLabel = createElement('label', form, { class: ['form'], htmlFor: 'shipping-zip-code', textContent: 'Shipping Zip Code: ' });
    const shippingZipCode = createElement('input', shippingZipCodeLabel, { class: ['form-input'], type: 'text', name: 'shippingZipCode', id: 'shipping-zip-code' });

    const shippingCityLabel = createElement('label', form, { class: ['form'], htmlFor: 'shipping-city', textContent: 'Shipping City: ' });
    const shippingCity = createElement('input', shippingCityLabel, { class: ['form-input'], type: 'text', name: 'shippingCity', id: 'shipping-city' });

    const shippingAddressLabel = createElement('label', form, { class: ['form'], htmlFor: 'shipping-address', textContent: 'Shipping Address: ' });
    const shippingAddress = createElement('input', shippingAddressLabel, { class: ['form-input'], type: 'text', name: 'shippingAddress', id: 'shipping-address' });

    const invoiceCountryLabel = createElement('label', form, { class: ['form'], htmlFor: 'invoice-country', textContent: 'Invoice Country: ' });
    const invoiceCountry = createElement('input', invoiceCountryLabel, { class: ['form-input'], type: 'text', name: 'invoiceCountry', id: 'invoice-country' });

    const invoiceZipCodeLabel = createElement('label', form, { class: ['form'], htmlFor: 'invoice-zip-code', textContent: 'invoice Zip Code: ' });
    const invoiceZipCode = createElement('input', invoiceZipCodeLabel, { class: ['form-input'], type: 'text', name: 'invoiceZipCode', id: 'invoice-zip-code' });

    const invoiceCityLabel = createElement('label', form, { class: ['form'], htmlFor: 'invoice-city', textContent: 'invoice City: ' });
    const invoiceCity = createElement('input', invoiceCityLabel, { class: ['form-input'], type: 'text', name: 'invoiceCity', id: 'invoice-city' });

    const invoiceAddressLabel = createElement('label', form, { class: ['form'], htmlFor: 'invoice-address', textContent: 'invoice Address: ' });
    const invoiceAddress = createElement('input', invoiceAddressLabel, { class: ['form-input'], type: 'text', name: 'invoiceAddress', id: 'invoice-address' });

    const button = createElement('input', form, { class: ['form'], type: 'submit', value: 'SUBMIT PROFILE' });

    return form;
}

//CREATING PROFILE - POST FETCH to server side
function createCustomerProfile(customerForm) {
    customerForm.addEventListener('submit', async function handleSubmit(event) {
        event.preventDefault();
        const formElements = event.target.elements;
        console.log(formElements);
        const customerData = createProfile(formElements);
        console.log(customerData); // 1 object

        await postProfile(customerData);
    });
}

async function postProfile(profile) {
    const httpResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
    });

    await httpResponse.json();
}

function createProfile(formElements) {
    const firstName = formElements['first-name'].value;
    const middleName = formElements['middle-name'].value;
    const lastName = formElements['last-name'].value;
    const email = formElements['email'].value;
    const shippingCountry = formElements['shipping-country'].value;
    const shippingZipCode = formElements['shipping-zip-code'].value;
    const shippingCity = formElements['shipping-city'].value;
    const shippingAddress = formElements['shipping-address'].value;
    const invoiceCountry = formElements['invoice-country'].value;
    const invoiceZipCode = formElements['invoice-zip-code'].value;
    const invoiceCity = formElements['invoice-city'].value;
    const invoiceAddress = formElements['invoice-address'].value;


    const profile = { // going to send this object to server
        name: {
            first: firstName,
            middle: middleName || 'none',
            last: lastName,
        },
        email: email,
        shipping: {
            country: shippingCountry,
            zip: shippingZipCode,
            city: shippingCity,
            address: shippingAddress,
        },
        invoice: {
            country: invoiceCountry,
            zip: invoiceZipCode,
            city: invoiceCity,
            address: invoiceAddress,
        }
    }
    return profile;
}


async function getAllCustomers() {
    const httpResponse = await fetch('/api/customers')
    const responseBody = await httpResponse.json();

    return responseBody;
}

function displayOrder(shoppingCart, orderInfoDiv) {
    const cartItemsDiv = createElement('ul', orderInfoDiv, {class: 'order-div'});
    const amountDiv = createElement('div', orderInfoDiv, {class: 'order-div'});

    shoppingCart.forEach(function (cartItem) {
        const itemTitle = createElement('li', cartItemsDiv, { textContent: ` Item: ${cartItem.title}, price: ${cartItem.price} Ft` });
    });

    const sum = addItemsPrice(shoppingCart);
    const sumOfItems = createElement('h3', amountDiv, { class: 'order-info', textContent: `Sum of items: ${sum} Ft` });

}

function addItemsPrice(shoppingCart) {
    let sum = null;

    for (const item of shoppingCart) {
        sum += parseInt(item.price);
    }
    return sum;
}

function main() {
    const root = document.getElementById('root');
    displayCart(root);
    const customerFormDiv = createElement('div', root, { class: 'form-customer' });
    const customerForm = createForm(customerFormDiv);
    createCustomerProfile(customerForm)
    const orderButtonDiv = createElement('div', root, {id: 'order-button-div'});
    const orderButton = createElement('button', orderButtonDiv, { id: 'order-button', textContent: 'PLACE ORDER' });
    //fetch cart & customer, display: product title list, sum of price, customer info
    orderButton.addEventListener('click', async function (event) {
        const orderInfoDiv = createElement('div', root, {id:'order-info'});
        const divTitle = createElement('h2', orderInfoDiv, { class: 'title', textContent: 'WE RECEIVED YOUR ORDER' });
        const shoppingCart = await getShoppingCart();
        console.log(shoppingCart);
        //const customer = await getAllCustomers();
        displayOrder(shoppingCart, orderInfoDiv);
    })
}

main();