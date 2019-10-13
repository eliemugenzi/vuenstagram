/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import { GET_POSTS } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
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
        console.error('Error', error);
      }
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
  },
});
