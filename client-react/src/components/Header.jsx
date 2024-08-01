import '../styles/stylesMainPage.css';

function Header(props) {
    const view = props.view;
    const onCartButtonClick = props.onCartButtonClick;

    return (
            <div id='header'>
                <img src='./src/assets/logo.png' id='logo'></img>
                <div className='header-right' >
                    <button id='cart-button' onClick={onCartButtonClick}> 
                    {view === 'products' ? 'CART' : 'BACK'}
                    </button>
                </div>
            </div>
    )
}

export default Header;