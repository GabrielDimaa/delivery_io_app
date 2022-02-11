import Vue from 'vue';
import App from './ui/App.vue';
import vuetify from './plugins/vuetify.js';
import store from './stores/store.js';
import router from './router/router.js';
import './plugins/toasted.js';
import './plugins/vuemask.js';
import './plugins/vuetify-money.js';
import 'es6-promise/auto.js';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
