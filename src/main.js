// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuelidate from "vuelidate";
import swal from "sweetalert";
import Vuex from "vuex";
import './assets/sass/main.scss';
// import { mapState } from 'vuex'

Vue.use(Vuetify);
Vue.use(Vuelidate);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  // computed: Vuex.mapState(['userList', 'MyProfile']),
  store,
  created() {
    //Triggering the actions
    this.$store.dispatch("getStoreUsersList");
    this.$store.dispatch("getStoreMyProfile");
  }
});
