import '../styles/stylesMainPage.css';
import logo from '../assets/logo.png';

function Header(props) {
    const view = props.view;
    const onCartButtonClick = props.onCartButtonClick;
    const onSortClick = props.onSortClick;
    const isSorted = props.isSorted;
    const onBackClick = props.onBackClick;

    return (
        <div id='header'>
            <img src={logo} id='logo'></img>
            <div className='header-right' >
                {view === 'products' && <button className='cart-button'onClick={onSortClick}>
                    {isSorted ? 'DESC' : 'SORT'}</button>}
                {isSorted && <button className='cart-button' onClick={onBackClick}>RESET</button>}
                <button className='cart-button' onClick={onCartButtonClick}>
                    {view === 'products' ? 'CART' : 'BACK'}
                </button>
            </div>
        </div>
    )
}

export default Header;