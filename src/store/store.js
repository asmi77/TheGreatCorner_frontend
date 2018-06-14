import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import http from "../helpers/http.js";

Vue.use(Vuex);
const usersURL = "https://thegreatcornerbackend.herokuapp.com/users/list";
const myProfileURL = "https://thegreatcornerbackend.herokuapp.com/profile";

const store = new Vuex.Store({
  state: {
    userList: {},
    myProfile: {}
  },
  actions: {
    getStoreMyProfile({ commit }) {
      http.get(myProfileURL).then(response => {
        console.log(
          "Store gets data MyProfile/senderID",
          response.data.profile
        );
        // acts mutations or access store & getters
        commit("updateProfile", response.data.profile);
      });
    },
    getStoreUsersList({ commit }) {
      http.get(usersURL).then(response => {
        console.log("Store gets data usersList", response.data.userList);
        commit("updateUsersList", response.data.userList);
      });
    }
  },
  mutations: {
    updateProfile(state, myProfile) {
      state.myProfile = myProfile;
      console.log("store mutation myprofile: ", myProfile);
    },
    updateUsersList(state, userList) {
      state.userList = userList;
      console.log("store mutation userList: ", userList);
    }
  }
});
export default store;
