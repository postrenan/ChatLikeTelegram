import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RoomsView from "@/views/RoomsView.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: LoginView
        },
        {
            path: '/salas',
            name: 'Rooms',
            component: RoomsView
        },
    ]
})

export default router
