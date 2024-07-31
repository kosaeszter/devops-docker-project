function createElement(elementName, parent, options) {
    const element = document.createElement(elementName);
    parent.appendChild(element);

    for (const [key, value] of Object.entries(options)) { //SWITCH RESEARCH
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
        }
    }
    return element;
}

function createForm(parentElement) {
    const form = createElement('form', parentElement, { type: 'form', method: 'get' });
    const titleLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-title', textContent: 'Product title: ' });
    const productTitle = createElement('input', titleLabel, { class: ['form-input'], type: 'text', name: 'productTitle', id: 'product-title' });

    const priceLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-price', textContent: 'Product price: ' });
    const productPrice = createElement('input', priceLabel, { class: ['form-input'], type: 'text', name: 'productPrice', id: 'product-price' });

    const descriptionLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-description', textContent: 'Product description: ' });
    const productDescription = createElement('input', descriptionLabel, { class: ['form-input'], type: 'text', name: 'productDescription', id: 'product-description' });

    const categoryLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-category', textContent: 'Product category: ' });
    const productCategory = createElement('input', categoryLabel, { class: ['form-input'], type: 'text', name: 'productCategory', id: 'product-category' });

    const ratingLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-rating', textContent: 'Product rating: ' });
    const productRating = createElement('input', ratingLabel, { class: ['form-input'], type: 'text', name: 'productRating', id: 'product-rating' });

    const imageLabel = createElement('label', form, { class: ['form-label'], htmlFor: 'product-image', textContent: 'Product image link: ' });
    const productImage = createElement('input', imageLabel, { class: ['form-input'], type: 'text', name: 'productImage', id: 'product-image' });

    const button = createElement('input', form, { class: ['form-label'], type: 'submit', value: 'Submit product' });
    return form;
}

function createProduct(formElements) {
    const productTitle = formElements['product-title'].value;
    const productPrice = formElements['product-price'].value;
    const productDescription = formElements['product-description'].value;
    const productCategory = formElements['product-category'].value;
    const productRating = formElements['product-rating'].value;
    const productImageLink = formElements['product-image'].value;

    const productData = {
        title: productTitle,
        price: productPrice,
        description: productDescription,
        category: productCategory,
        rating: productRating,
        image: productImageLink,
    }
    return productData
}

async function postProduct(productData) {
    const httpResponse = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    });

    const postedProduct = await httpResponse.json();
    return postedProduct;
}

//CREATING - POST FETCH to server side 
function createProductEditor(productEditorDiv) {
    const productEditorForm = createForm(productEditorDiv);
    productEditorForm.addEventListener('submit', async function handleSubmit(event) {
        event.preventDefault();
        const formElements = event.target.elements;
        const productData = createProduct(formElements);
        const createdProduct = await postProduct(productData);
        console.log(createdProduct); //ezt a logot miert nem latom?
    });
}

// LIST OF EXISTING - GET FETCH from server + made into a LI + added 2 buttons per LI
async function displayProducts(existingProductsDiv) {
    const existingProductsList = createElement('ul', existingProductsDiv, { class: ['list-group'] });
    const products = await getAllProducts();
    console.log(products);

    products.forEach(function (product) {
        const item = createElement('li', existingProductsList, { class: 'list-group-item' });
        createProductElements(product, item);
        const buttonEdit = createElement('button', item, { class: 'button-edit', textContent: 'edit', id: `${product.id}` });
        const buttonDelete = createElement('button', item, { class: 'button-delete', textContent: 'delete', id: `${product.id}` });
    });
    return { products, existingProductsList };
}

// DELETE OR EDIT 
function handleProductUpdate(existingProductsList, root, products) {
    existingProductsList.addEventListener('click', async function (event) {
        const productID = event.target.id; //number
        console.log(productID);
        const buttonType = event.target.className; //string class
        console.log(buttonType);

        if (buttonType === 'button-delete') {
            await deleteProductById(productID);
        }
        if (buttonType === 'button-edit') {
            const editorDiv = createElement('div', root, { class: 'form-editor' });
            const productToChange = findProductToChange(products, productID) // 1 object
            console.log(productToChange);
            const editingForm = createForm(editorDiv);
            const editedForm = fillEditingForm(editingForm, productToChange);
            editedForm.addEventListener('submit', (event) => handleEdit(event, productID, productToChange));
        }
    });
}

async function handleEdit(event, productID) {
    event.preventDefault();

    const formElements = event.target.elements;
    const productData = createProduct(formElements);

    const changedProduct = await patchProduct(productID, productData);
    console.log(changedProduct);
}

async function patchProduct(productID, productData){
    const httpResponse = await fetch(`/api/products/${productID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
    
      const updatedProduct = await httpResponse.json();
      return updatedProduct; 
}

function fillEditingForm(editingForm, productToChange) {
    editingForm.elements['product-title'].value = productToChange.title;
    editingForm.elements['product-price'].value = productToChange.price;
    editingForm.elements['product-description'].value = productToChange.description;
    editingForm.elements['product-category'].value = productToChange.category;
    editingForm.elements['product-rating'].value = productToChange.rating;
    editingForm.elements['product-image'].value = productToChange.image;
    return editingForm
}


function findProductToChange(products, productID) { //finds object
    let productToChange = {};

    for (const product of products) {
        if (product.id == productID) {
            productToChange = product;
        }
    }
    return productToChange;
}

async function deleteProductById(id) {
    const httpResponse = await fetch(`/api/products/${id}`,
        {
            method: 'DELETE'
        }
    );

    const deletedProduct = await httpResponse.json();
    console.log('Deleted Product:', deletedProduct);
}


function createProductElements(product, parentElement) { // each li content is created here from key-value
    Object.entries(product).forEach(function ([key, value]) {
        createElement('div', parentElement, { textContent: `${key}: ${value}` });
    });
}

async function getAllProducts() {
    const httpResponse = await fetch('/api/products')
    const responseBody = await httpResponse.json();

    return responseBody;
}

async function main() {
    const root = document.getElementById('root');
    const creatorTitle = createElement('h2', root, { textContent: 'Create new product' });
    const productEditorDiv = createElement('div', root, { class: 'form-editor' });
    createProductEditor(productEditorDiv);

    const listTitle = createElement('h2', root, { textContent: 'List of existing Products' });
    const existingProductsDiv = createElement('div', root, { class: 'existing-products' });
    const { products, existingProductsList } = await displayProducts(existingProductsDiv);
    console.log(existingProductsList);
    const editorTitle = createElement('h2', root, { textContent: 'Edit existing product' });
    handleProductUpdate(existingProductsList, root, products);


}

main();