import Vue from 'vue'
import Router from 'vue-router'
import Particle from '@/container/Particle'
import Login from '@/container/Login'
import Home from '@/container/Home'
import Landing from '@/container/Home/Landing';
import Dashboard from '@/container/Home/Dashboard';
import SelectTemplates from '@/container/Home/SelectTemplates';
import Profile from '@/container/Home/Profile';
import VueSlider from '@/container/Home/VueSlider';
import Auth from '@/packages/auth/Auth.js';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Particle',
      component: Particle,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'Landing',
          component: Landing,
          meta: { requiresAuth: true },
        },
        {
          path: '/dashboard/:resume_id',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: '/select-templates',
          name: 'SelectTemplates',
          component: SelectTemplates,
          meta: { requiresAuth: true },
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          meta: { requiresAuth: true },
        },
        {
          path: '/slider',
          name: 'VueSlider',
          component: VueSlider,
          meta: { requiresAuth: true },
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth))
  {
    // console.log('Login', to);
    if(!Auth.isAuthenticated()) {
      next({
        name: 'Login'
      })
    }
    else {
      next();  // make sure to always call next()!
    }
  }
  else if (to.matched.some(record => {
    // console.log(record);
    return !record.meta.requiresAuth
  }))
  {
    if(Auth.isAuthenticated()) {
      next({
        name: 'Landing'
      })
    }
    else {
      next();  // make sure to always call next()!
    }
  }
  else {
    next();  // make sure to always call next()!
  }
});

export default router;
