import Vue from 'vue'
import {createPinia, PiniaVuePlugin} from 'pinia'
//import {socketio} from 'socket.io-client'

import App from './App.vue'
import router from './router'

import './assets/main.css'

Vue.use(PiniaVuePlugin)
//Vue.prototype.$soketio = socketio;

new Vue({
    router,
    pinia: createPinia(),
    render: (h) => h(App)
}).$mount('#app')
