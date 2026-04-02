var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'соняшник ягуар', short_text: 'високоврожайний гібрид', image: 'img/son/w1.jpg', desc: 'стійкий до посухи та хвороб, має високий вміст олії. ідеальний для південних регіонів.'},
            {id: 2, title: 'соняшник піонер', short_text: 'класичний стійкий сорт', image: 'img/son/w2.jpg', desc: 'стабільний гібрид з великим насінням. адаптований до різних типів ґрунтів.'},
            {id: 3, title: 'соняшник лімагрейн', short_text: 'лідер по виходу олії', image: 'img/son/w3.jpg', desc: 'середньоранній сорт, стійкий до вовчка. забезпечує стабільний прибуток фермеру.'},
            {id: 4, title: 'соняшник кондитерський', short_text: 'велике насіння для їжі', image: 'img/son/w4.jpg', desc: 'сорт з дуже великим та смачним насінням. має високу ринкову вартість.'},
            {id: 5, title: 'соняшник декоративний', short_text: 'для саду та краси', image: 'img/son/w5.jpg', desc: 'низькорослий сорт з яскравими квітками. використовується для ландшафтного дизайну.'}
        ],
        product: {},
        btnVisible: 0,
        cart: [],
        contactFields: {
            name: '',
            company: '',
            position: '',
            city: '',
            country: '',
            phone: '',
            email: '',
            role: 'seed producer',
            specify: '',
            interest: ''
        },
        orderSubmitted: false 
    },
    mounted: function() {
        this.getProduct();
        this.checkInCart();
        this.getCart(); 
    },
    methods: {
        getProduct: function() {
            var id = window.location.hash.replace('#', '');
            if (this.products && this.products.length > 0) {
                for (var i in this.products) {
                    if (this.products[i].id == id) {
                        this.product = this.products[i];
                    }
                }
            }
        },

        addToCart: function(id) {
            var cart = [];
            if (window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if (cart.indexOf(String(id)) == -1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join(','));
                this.btnVisible = 1;
            }
        },

        checkInCart: function() {
            if (this.product && this.product.id && window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart').split(',');
                if (cart.indexOf(String(this.product.id)) != -1) {
                    this.btnVisible = 1;
                }
            }
        },

        getCart: function() {
            this.cart = []; 
            if (window.localStorage.getItem('cart')) {
                var savedIds = window.localStorage.getItem('cart').split(',');
                for (var i = 0; i < savedIds.length; i++) {
                    for (var j = 0; j < this.products.length; j++) {
                        if (this.products[j].id == savedIds[i]) {
                            this.cart.push(this.products[j]);
                        }
                    }
                }
            }
        },

        removeFromCart: function(id) {

            this.cart = this.cart.filter(item => item.id != id);
            

            var updatedIds = this.cart.map(item => item.id);
            if (updatedIds.length > 0) {
                window.localStorage.setItem('cart', updatedIds.join(','));
            } else {
                window.localStorage.removeItem('cart');
            }
        },

        makeOrder: function() {
            this.orderSubmitted = true; 
            this.cart = []; 
            window.localStorage.removeItem('cart'); 
        }
    }
});