// import { createElement } from "./functionLibrary.js";

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


function createProductCard(product, parentElement) { //1 object
    const image = createElement('img', parentElement, { src: product['image'], 'style.width': '100%' });
    const title = createElement('h1', parentElement, { textContent: product.title });
    const price = createElement('p', parentElement, { class: 'price', textContent: `price: ${product.price} Ft` });
    const category = createElement('p', parentElement, { class: 'category', textContent: ` category: ${product.category}` });
    const rating = createElement('p', parentElement, { class: 'rating', textContent: `rating: ${product.rating}` });
    const description = createElement('p', parentElement, { class: 'description', textContent: product.description });
}

async function displayProducts(root) { //display product container function
    const productsDiv = createElement('div', root, { id: 'products-container' });
    const products = await getAllProducts();


    products.forEach(function (product) { // display products - in smaller functions 
        const productCard = createElement('div', productsDiv, { class: 'card' });
        const cardContent = createElement('div', productCard, {class: 'content'});
        createProductCard(product, cardContent);
        const button = createElement('button', productCard, { textContent: 'Add to cart', id: product.title });
    });
    
    productsDiv.addEventListener('click', async function (event) {
        const buttonID = event.target.id; //same as product title
        console.log(buttonID);
        const clickedProductId = findClickedProduct(products, buttonID);
        console.log(clickedProductId); // have a product id 
        await postShoppingCart(clickedProductId);


    });
}

function findClickedProduct(products, buttonID) { // CUSTOMER DATA ATTRIBUTE, ID to identify the button, DATA should be in attribute, event.target.parent (parent elementbol mar elerheto), event-handler on container, target - button, current target (container with product and button), button doesnt need data attribute
    let clickedProductId = '';
    for (const product of products) {
        if (product.title === buttonID) {
            clickedProductId = product.id;
        }
    }
    return clickedProductId;
}

async function postShoppingCart(clickedProductId) {
    const httpResponse = await fetch(`/api/shopping/${clickedProductId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    // response needed - STATUS 
}

async function getAllProducts() {
    const httpResponse = await fetch('/api/products')
    const responseBody = await httpResponse.json();
    return responseBody;
}


function main() { // ADD LAYOUT FUNCTION
    const root = document.getElementById('root');
    const header = createElement('header', root, { id: 'header' });
    const logo = createElement('img', header, {id: 'logo', src:'./static/images/logo.png'});
    const headerRight = createElement('div', header, {class: "header-right"});
    const buttonCart = createElement('button', headerRight, {id: 'cart-button', textContent: 'CART'});
    buttonCart.addEventListener('click', function(){
        window.location.href = 'http://localhost:8080/customer';
    });
    const buttonEditor = createElement('button', headerRight, {id: 'editor-button', textContent: 'EDITOR'});
    buttonEditor.addEventListener('click', function(){
        window.location.href = 'http://localhost:8080/edit';
    });
    const mainBannerDiv = createElement('div', root, {id: 'main-banner-div'});
    const mainBanner = createElement('img', mainBannerDiv, {id: 'main-banner', src: './static/images/panel.png'});

    displayProducts(root);
}

main();