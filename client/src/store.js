/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from './queries';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    getPosts: async ({ commit }) => {
      // Use ApolloClient to fire getPosts query
      commit('setLoading', true);
      try {
        const { data: { getPosts } } = await apolloClient.query({
          query: GET_POSTS,
        });
        // Commit passes data from action to its corrsponding mutation function
        commit('setPosts', getPosts);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        // eslint-disable-next-line no-console
        console.error('Error', error);
      }
    },
    signinUser: async ({ commit }, { username, password }) => {
      try {
        const { data: { signinUser } } = await apolloClient.mutate({
          mutation: SIGNIN_USER,
          variables: {
            username,
            password,
          },
        });
        console.log('SIGNIN USER', signinUser);
        localStorage.setItem('token', signinUser.token);
        // Reload the page to make sure the created method is run in main.js (to tun getCurrentuser)
        router.go();
      } catch (error) {
        console.error(error);
      }
    },
    getCurrentUser: async ({ commit }) => {
      commit('setLoading', true);
      try {
        const { data: { getCurrentUser } } = await apolloClient.query({
          query: GET_CURRENT_USER,
        });
        console.log('USER', getCurrentUser);
        commit('setLoading', false);
        commit('setUser', getCurrentUser);
      } catch (error) {
        commit('setLoading', false);
        console.log(error);
      }
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
  },
});
