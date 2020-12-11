if (localStorage.getItem('cart')) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let shopCart = new Cart(cart);
    let select = document.querySelector('select');

    const data = {
        header: 'Корзина товаров',
        options: {
            'delete': {
                'isTag': true,
                'tfootIsJoint': true,
                'needTfoot': true,
                'footerClass': 'total-price',
                'footnote': () => {
                    let total = 0;
                    for (let key in shopCart.items) {
                        total += shopCart.items[key]['price'][shopCart.currency] * shopCart.items[key]['count'];
                    }
                    return `Итого: ${total} ${shopCart.currency}`;
                }
            },
            'image': {
                'isTag': true,
            },
            'title': {
                'isTag': true,
            },
            'minus': {
                'isTag': true,
            },
            'count': {
                'isTag': true,
            },
            'plus': {
                'isTag': true,
            },
            'total': {
                'isTag': true,
            }
        },
        data: shopCart.render()
    }

    const gridView = new GridView();
    gridView.setElement('.cart-out');
    gridView.setTableClass(['cart']);
    gridView.renderTable(data);

    let cartButtons = document.querySelectorAll(`.${shopCart.buttonClass}`);

    let reRenderTable = () => {
        document.querySelector('.cart-out').innerHTML = '';
        data['data'] = shopCart.render();
        gridView.renderTable(data);
        localStorage.setItem('cart', JSON.stringify(shopCart.items));
    }

    const setFunctionOnButtons = (arrayOfButtons) => {
        arrayOfButtons.forEach(item => {
            item.onclick = () => {
                if (item.classList.contains(shopCart.deleteClass)) {
                    shopCart.goodsDelete(item.dataset['articul']);
                }
                if (item.classList.contains(shopCart.plusClass)) {
                    shopCart.goodsPlus(item.dataset['articul']);
                }
                if (item.classList.contains(shopCart.minusClass)) {
                    shopCart.goodsMinus(item.dataset['articul']);
                }
                reRenderTable();
                cartButtons = document.querySelectorAll(`.${shopCart.buttonClass}`);

                setFunctionOnButtons(cartButtons);
            }
        })
    }
    select.oninput = () => {
        shopCart.currency = select.value;
        reRenderTable();
        setFunctionOnButtons(cartButtons);
        cartButtons = document.querySelectorAll(`.${shopCart.buttonClass}`);
    }
    setFunctionOnButtons(cartButtons);
}