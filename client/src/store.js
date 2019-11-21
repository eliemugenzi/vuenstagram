/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import { defaultClient as apolloClient } from './main';
import {
  GET_POSTS, SIGNIN_USER, GET_CURRENT_USER, SIGNUP_USER, CREATE_POST,
} from './queries';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null,
    error: null,
    authError: null,
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
    clearUser: (state) => {
      state.user = null;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
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
      localStorage.setItem('token', '');
      commit('setError', null);
      commit('setLoading', true);
      try {
        const { data: { signinUser } } = await apolloClient.mutate({
          mutation: SIGNIN_USER,
          variables: {
            username,
            password,
          },
        });
        commit('setLoading', false);
        localStorage.setItem('token', signinUser.token);
        // Reload the page to make sure the created method is run in main.js (to tun getCurrentuser)
        router.go();
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
      }
    },
    getCurrentUser: async ({ commit }) => {
      commit('setLoading', true);
      try {
        const { data: { getCurrentUser } } = await apolloClient.query({
          query: GET_CURRENT_USER,
        });
        commit('setLoading', false);
        commit('setUser', getCurrentUser);
      } catch (error) {
        commit('setLoading', false);
      }
    },
    signOut: async ({ commit }) => {
      // Clear user in state
      commit('clearUser', null);

      // Remove token in localStorage
      localStorage.setItem('token', '');
      // End Session
      await apolloClient.resetStore();
      // Redirects home - kicks users out of private routes
      router.push('/');
    },
    signupUser: async ({ commit }, {
      username,
      email,
      password,
    }) => {
      localStorage.setItem('token', '');
      commit('setError', null);
      commit('setLoading', true);
      try {
        const { data: { signupUser } } = await apolloClient.mutate({
          mutation: SIGNUP_USER,
          variables: {
            username,
            email,
            password,
          },
        });
        commit('setLoading', false);
        localStorage.setItem('token', signupUser.token);
        router.go();
      } catch (error) {
        commit('setLoading', false);
      }
    },
    addPost: async ({ commit }, payload) => {
      try {
        const { data: { addPost } } = await apolloClient.mutate({
          mutation: CREATE_POST,
          variables: payload,
          update: (cache, { data: { addPost: createPost } }) => {
            // First read the query you want to update
            const data = cache.readQuery({
              query: GET_POSTS,
            });

            // Create updated data
            data.getPosts.unshift(createPost);

            // Update cache
            cache.writeQuery({
              query: GET_POSTS,
              data,
            });
          },
          // Ensures data is added immediately
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload,
            },
          },
        });
        console.log('CREATED', addPost);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authError: state => state.authError,
  },
});
