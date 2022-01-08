import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#503E9D",
                secondary: "#FCBF49",
                accent: "#FCBF49",
                error: "#FB3640",
                success: "#0BB14E",
                warning: '#FFC107',
            },
        },
    },
    icons: {iconfont: 'mdi'}
});
