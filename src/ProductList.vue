<template>
    <div id="products" class="row list-group">
        <div v-for="product in products" class="item col-xs-4">
            <div class="thumbnail">
                <router-link
                        :to="{ name: 'viewProduct', params: { productId: product.id } }"
                        tag="img"
                        class="group inner list-group-item-heading"
                        src="http://placehold.it/400x250/000/fff">

                </router-link>

                <div class="caption">
                    <router-link
                            :to="{ name: 'viewProduct', params: { productId: product.id } }"
                            tag="h4"
                            class="group inner list-group-item-heading">
                        <a>{{ product.name }}</a>
                    </router-link>

                    <p class="group inner list-group-item-text">{{ product.description }}</p>
                    <br>

                    <div class="row flex flex-row align-center">
                        <div class="col-xs-4">
                            <p class="lead">{{ product.price | currency }}</p>
                        </div>

                        <div class="col-xs-8 flex flex-row align-center justify-right">
                            <div class="number-in-stock" :class="{ few: product.inStock < 10 && product.inStock > 0, none: product.inStock == 0 }">
                                {{ product.inStock }} in stock
                            </div>
                            <button class="btn btn-success" @click="addProductToCart(product, 1)" :disabled="product.inStock == 0">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { HTTP } from './http.js';

    export default {
        data() {
            return {
                products: []
            };
        },
        created() {
            HTTP.get('products')
                .then(data => this.products = data)
                .then(err => console.log(err))
        },
        computed: {
          cart(){
            return this.$store.state.cart
          },
          cartTotal: {
            get(){
              return this.$store.state.cartTotal;
            },
            set(value){
              this.$store.state.cartTotal = value;
            }
          }
        },
        methods: {
            getCartItem(product) {
                for (let i = 0; i < this.cart.items.length; i++) {
                    if (this.cart.items[i].product.id === product.id) {
                        return this.cart.items[i];
                    }
                }

                return null;
            },

            addProductToCart(product, quantity) {
                let cartItem = this.getCartItem(product);

                // TODO: Verify that there is "quantity" of the product in stock before adding it.

                if (cartItem != null) {
                    cartItem.quantity += quantity;
                } else {
                    this.cart.items.push({
                        product: product,
                        quantity: quantity
                    });
                }

                product.inStock -= quantity;
                this.cartTotal += product.price * quantity;
            }
        }
    }
</script>

<style>
    #products .item img { background-color: #000; cursor: pointer; }
    #products .item p.lead { margin-bottom: 0; }
    #products .item .number-in-stock { margin-right: 10px; }
    #products .item .number-in-stock.few { color: #E0A14F; }
    #products .item .number-in-stock.none { color: #C45E5E; }
</style>
