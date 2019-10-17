/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AddPost from './components/posts/AddPost.vue';
import Posts from './components/posts/Posts.vue';

import Profile from './components/auth/Profile.vue';
import Signin from './components/auth/Signin.vue';
import Signup from './components/auth/Signup.vue';

import AuthGuard from './AuthGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/posts/add',
      name: 'AddPost',
      component: AddPost,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
});
