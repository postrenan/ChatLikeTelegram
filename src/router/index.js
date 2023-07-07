import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Rooms from "@/views/Rooms.vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login
        },
        {
            path: '/salas',
            name: 'Rooms',
            component: Rooms
        },
    ]
})

export default router
