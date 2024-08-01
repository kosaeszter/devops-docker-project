import '../styles/stylesMainPage.css'

function Products(props) {
    const products = props.data;
    const isCart = props.isCart;
    const onProductRemoved = props.onProductRemoved;

    async function handleAddToCart(productId) {
        const httpResponse = await fetch(`/api/shopping/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        await httpResponse.json();
    }

    async function handleRemoveFromCart(productId) {
        const httpResponse = await fetch(`/api/shopping/${productId}`,
            {
                method: 'DELETE'
            }
        );

        const deletedProduct = await httpResponse.json();
        console.log(deletedProduct);
        onProductRemoved(productId);
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
                        {isCart ?
                            (<button onClick={() => handleRemoveFromCart(product.id)}>
                                Remove from cart </button>) : (
                                <button onClick={() => handleAddToCart(product.id)}>
                                    Add to cart </button>
                            )}
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Products;