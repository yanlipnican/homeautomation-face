import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/Login';
import NodeEditor from '@/components/NodeEditor';
import store from '../store';

Vue.use(Router);

const router = new Router({
    routes: [
        // {
        //   path: '/',
        //   name: 'Hello',
        //   component: Hello,
        // },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        {
            path: '/',
            name: 'Home',
            component: NodeEditor,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
    ],
});

export default router;
