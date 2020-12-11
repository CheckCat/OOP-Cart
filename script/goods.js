const cart = {
    "p92779": {
        "name": "Мужские часы CASIO G-2900F-8VER",
        "url": "#",
        "image": "./images/casio-g-2900f-8ver_images_1650372917.jpg",
        "price": {
            'UAH': 1720.00,
            'RUB': 2325.00,
        }
    },
    "p93039": {
        "name": "Мужские часы CASIO AE-1000W-1AVEF",
        "url": "#",
        "image": "./images/casio-ae-1000w-1avef_images_1675943357.jpg",
        "price": {
            'UAH': 872.00,
            'RUB': 562.00,
        }
    },
    "p63553250": {
        "name": "Наручные часы Casio W-800H-1AVES",
        "url": "#",
        "image": "./images/63553250_images_9154502355.jpg",
        "price": {
            'UAH': 484.00,
            'RUB': 670.00,
        }
    },
    "p93127": {
        "name": "Мужские часы CASIO EF-552-1AVEF",
        "url": "#",
        "image": "./images/casio-ef-552-1avef_images_1583730891.jpg",
        "price": {
            'UAH': 2880.00,
            'RUB': 4463.00,
        }
    },
    "p79946990": {
        "name": "Мужские часы Casio EF-527D-1AVEF",
        "url": "#",
        "image": "./images/79946990_images_11571324122.jpg",
        "price": {
            'UAH': 4290.00,
            'RUB': 7930.00,
        }
    },
    "p6533206": {
        "name": "Мужские часы CASIO SGW-100-2BER",
        "url": "#",
        "image": "./images/6533206_images_1657626044.jpg",
        "price": {
            'UAH': 2416.00,
            'RUB': 4329.00,
        }
    },
}

let select = document.querySelector('select');

let renderCardList = () => {
    let currency = select.value;

    let out = document.createElement('div');
    out.classList.add('pricing-table', 'row');

    for (let key in cart) {
        let card = document.createElement('div');
        card.classList.add('col', 'col-md-6', 'col-lg-4');

        let cardContent = document.createElement('div');
        cardContent.classList.add('package', 'featured', 'text-center');

        let cardTitle = document.createElement('h2');
        cardTitle.textContent = cart[key]['name'];

        let cardImage = document.createElement('img');
        cardImage.setAttribute('src', cart[key]["image"]);

        let cardPrice = document.createElement('p');
        cardPrice.classList.add('price');
        cardPrice.textContent = `${cart[key]['price'][currency]} ${currency}`;

        let toCart = document.createElement('button');
        toCart.classList.add('to-cart', 'button-primary');
        toCart.dataset.articul = key;
        toCart.textContent = 'В корзину';

        cardContent.append(cardTitle, cardImage, cardPrice, toCart);
        card.append(cardContent);
        out.append(card);
    }

    let goods = document.querySelector('.goods');
    goods.innerHTML = '';
    goods.append(out);

    let toCartButtons = document.querySelectorAll('.goods button');

    const data = JSON.parse(localStorage.getItem('cart')) || {};

    toCartButtons.forEach(elem => {
        elem.onclick = () => {
            let articul = elem.dataset['articul'];
            if (data[articul]) {
                data[articul]['count']++;
            } else {
                data[articul] = cart[articul];
                data[articul]['count'] = 1;
            }
            localStorage.setItem('cart', JSON.stringify(data));
        }
    })
}

select.oninput = () => {
    renderCardList();
}

renderCardList();