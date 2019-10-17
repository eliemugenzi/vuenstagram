/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import FormAlert from './components/shared/FormAlert.vue';

// Register a component globally
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

// Setup Apolloclient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
  // Include Auth token
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    // If no token in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }

    // Adds the token to the authorization header
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
  onError: ({
    graphQLErrors, networkError,
  }) => {
    if (networkError) {
      console.log('[Network Error]', networkError);
    }

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.dir(err);
        if (err.name === 'AuthenticatinEror') {
          // Set auth error in state ( to show in snackbar)
          store.commit('setAuthError', err);

          // signout user(to clear token)
          store.dispatch('signOut');
        }
      }
    }
  },
});

const apolloProvider = new VueApollo({
  defaultClient,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  provide: apolloProvider.provide(),
  render: h => h(App),
  created() {
    // Execute getCurrentUser query
    this.$store.dispatch('getCurrentUser');
  },
}).$mount('#app');

export default defaultClient;
