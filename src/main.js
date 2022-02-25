import Vue from 'vue';
import App from './ui/App.vue';
import vuetify from './plugins/vuetify.js';
import store from './stores/store.js';
import router from './router/router.js';
import './plugins/toasted.js';
import './plugins/vuemask.js';
import './plugins/vuetify-money.js';
import 'es6-promise/auto.js';
import Echo from 'laravel-echo';

Vue.config.productionTip = false;

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: process.env.VUE_APP_WS_BROADCASTER,
  key: process.env.VUE_APP_WS_KEY,
  wsHost: process.env.VUE_APP_WS_HOST,
  wsPort: 6001,
  forceTLS: false
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
