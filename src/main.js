// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdi/css/materialdesignicons.css';

import App from './App';
import router from './router';
import store from './store';
import messages from './internationalization';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueI18n);

// Create VueI18n instance with options
/* eslint-disable no-new */
const i18n = new VueI18n({
  locale: 'cs', // set locale
  messages, // set locale messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
