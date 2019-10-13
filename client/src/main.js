import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(VueApollo);

// Setup Apolloclient
const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql/',
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
}).$mount('#app');
