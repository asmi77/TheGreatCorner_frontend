<template>
    <v-app class="margin">
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12 class="profile__cardBox">
              <v-card-media src="" height="100px">
                <v-layout column class="media">
                  <v-card-title>
                    <v-btn dark icon @click="goUsersList">
                      <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-title class="white--text pl-5 pt-5">
                  </v-card-title>
                </v-layout>
              </v-card-media>
              <v-list two-line>
                <!-- User informations -->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="blue-grey ">person</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ userProfile.firstName}}</v-list-tile-title>
                    <v-list-tile-sub-title>User</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
               
                <v-divider inset></v-divider>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="blue-grey ">location_on</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ userProfile.userAddress[0].city }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ userProfile.userAddress[0].country }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
    

    </v-app>
 
</template>

<script>
/* eslint-disable */
//   import http from '../../helpers/http'
import axios from "axios";
import http from "../helpers/http.js";
// import router from 'vue-router';

export default {
  name: "UserDetails",
  data() {
    return {
      titre1: "Profil de l'utilisateur",
      show: false,
      userProfile: {}
    };
  },
  created() {
    let userParamsID = this.$route.params.id;
    console.log("URL user id: ", userParamsID);
    // Retrieve user profile
    http
      .get("users/users/" + userParamsID)
      .then(res => {
        this.userProfile = res.data.content;
        console.log("voici le res.data.content: ", res.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goUsersList() {
      this.$router.push("/users");
    }
  }
};
</script>

<style scoped>
.cardStyle {
  background-color: #BCAAA4;
}

</style>



