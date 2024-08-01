import '../styles/stylesMainPage.css';

function Header(props) {
    const view = props.view;
    const onCartButtonClick = props.onCartButtonClick;
    const onSortClick = props.onSortClick;
    const isSorted = props.isSorted;

    return (
        <div id='header'>
            <img src='./src/assets/logo.png' id='logo'></img>
            <div className='header-right' >
                {view === 'products' && <button className='cart-button'onClick={onSortClick}>
                    {isSorted ? 'BACK' : 'SORT'}</button>}
                <button className='cart-button' onClick={onCartButtonClick}>
                    {view === 'products' ? 'CART' : 'BACK'}
                </button>
            </div>
        </div>
    )
}

export default Header;