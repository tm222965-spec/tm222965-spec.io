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
        btnvisible: 0 
    },
    mounted: function() {
        this.getproduct();
        this.checkincart();
    },
    methods: {

        getproduct: function() {
            var id = window.location.hash.replace('#', '');
            if (this.products && this.products.length > 0) {
                for (var i in this.products) {
                    if (this.products[i].id == id) {
                        this.product = this.products[i];
                    }
                }
            }
        },

        addtocart: function(id) {
            var cart = [];
            if (window.localstorage.getitem('cart')) {
                cart = window.localstorage.getitem('cart').split(',');
            }
            if (cart.indexof(string(id)) == -1) {
                cart.push(id);
                window.localstorage.setitem('cart', cart.join(','));
                this.btnvisible = 1;
            }
        },

        checkincart: function() {
            if (this.product && this.product.id && window.localstorage.getitem('cart')) {
                var cart = window.localstorage.getitem('cart').split(',');
                if (cart.indexof(string(this.product.id)) != -1) {
                    this.btnvisible = 1;
                }
            }
        }
    }
});