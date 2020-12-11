class Cart {
    constructor(
        items,
        cartClass = "cart",
        plusClass = 'plus',
        minusClass = 'minus',
        deleteClass = 'delete',
        buttonClass = 'button-primary',
        currency = 'RUB') {
        this.items = items;
        this.plusClass = plusClass;
        this.minusClass = minusClass;
        this.deleteClass = deleteClass;
        this.buttonClass = buttonClass;
        this.cartClass = cartClass;
        this.currency = currency;
    }
    
    goodsPlus(art) {
        this.items[art]['count']++;
    }

    goodsMinus(art) {
        if (this.items[art]['count'] == 1) {
            this.goodsDelete(art);
        } else {
            this.items[art]['count']--;
        }
    }

    goodsDelete(art) {
        delete this.items[art];
    }

    getTotal() {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key]['count'] * this.items[key]['price'];
        }
        return total;
    }

    render() {
        const arr = [];
        for (let key in this.items) {
            let objectOfGoods = {
                delete: {
                    content: '<button>x</button>',
                    className: [this.deleteClass, this.buttonClass],
                    attribute: {
                        'data-articul': key
                    }
                },
                image: {
                    content: '<img>',
                    attribute: {
                        'src': this.items[key]['image'],
                    }
                },
                title: {
                    content: '<a><h4>Мужские часы CASIO AE-1000W-1AVEF</h4></a>',
                    attribute: {
                        'href': this.items[key]['url']
                    }
                },
                minus: {
                    content: '<button>-</button>',
                    className: [this.minusClass, this.buttonClass],
                    attribute: {
                        'data-articul': key
                    }
                },
                count: {
                    content: `<span>${this.items[key]['count']}</span>`,
                },
                plus: {
                    content: '<button>+</button>',
                    className: [this.plusClass, this.buttonClass],
                    attribute: {
                        'data-articul': key
                    }
                },
                total: {
                    content: `<span>${this.items[key]['price'][this.currency] * this.items[key]['count']} ${this.currency}</span>`,
                }
            }
            
            arr.push(objectOfGoods);
        }
        return arr;
    }
}