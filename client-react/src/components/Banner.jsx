function Banner(props) {
    const view = props.view;

    return (
        <div id='main-banner-div'>
            <img id='main-banner' src = { view === 'products' ? './src/assets/panelWide.png' : './src/assets/cart.png'}>
            </img>
        </div>
    )
}

export default Banner;