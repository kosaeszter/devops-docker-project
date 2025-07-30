import panelextrawide from '../assets/panelextrawide.png';
import cart from '../assets/cart.png';

function Banner(props) {
    const view = props.view;

    return (
        <div id='main-banner-div'>
            <img id='main-banner' src = { view === 'products' ? panelextrawide : cart}>
            </img>
        </div>
    )
}

export default Banner;