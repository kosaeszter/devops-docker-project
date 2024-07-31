import './stylesMainPage.css'

function Products(props) {
    const products = props.data;
    console.log(products);
    const isCart = props.isCart;

    async function handleAddToCart(productId) {
        console.log(productId);
        const httpResponse = await fetch(`/api/shopping/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        console.log(await httpResponse.json());
    }

    return (
        <div>
            <div id='products-container'>
                {products.map((product, index) => (
                    <div className='card' key={index}>
                        <div className='content'>
                            <img src={product.image} width={'100%'}></img>
                            <h2>{product.title}</h2>
                            <p className='price'> Price: {product.price} Ft</p>
                            <p>Category: {product.category}</p>
                            <p>Rating: {product.rating}</p>
                            <p>Description: {product.description}</p>
                        </div>
                        <button onClick={() => handleAddToCart(product.id)}>
                            {isCart ? 'Remove from cart' : 'Add to cart'}
                        </button>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Products;