import Vue from 'vue';
import money from 'v-money';

Vue.use(money, {
    decimal: ',',
    thousands: '.',
    precision: 2,
    masked: false
});