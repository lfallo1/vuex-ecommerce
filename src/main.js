import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.filter('currency', function(value) {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

    return formatter.format(value);
});

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    cart: {
      items: []
    },
    cartTotal: 0
  }
});

const router = new VueRouter({
    routes: routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            };
        }

        if (savedPosition) {
            return savedPosition;
        }

        return { x: 0, y: 0 };
    }
});

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    store: store
});
