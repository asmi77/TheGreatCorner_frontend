<template>
  <v-app>
     <v-container grid-list-md text-xs-center>
    <div class="users">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="brown lighten-3" dark>
              <v-toolbar-title class="text-xs-center">Contact a user</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list subheader>
              <!-- <v-subheader>Users list</v-subheader> -->
              <v-list-tile v-for="(user, index) in users" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title v-html="user.firstName"></v-list-tile-title>
                </v-list-tile-content>
                <!-- send message button -->
                <v-list-tile-action>
                  <v-btn flat icon color="brown lighten-3" @click="getUserProfile(user._id)">
                    <v-icon>info_outline</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn flat icon color="brown lighten-3" @click="sendMessageToUser(user._id)">
                    <v-icon>chat_bubble</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
     </v-container>
  </v-app>
</template>


<script>
import axios from "axios";
import http from "../helpers/http.js";
import Router from "vue-router";

export default {
  name: "Users",
  data() {
    return {
      title: 'The GreatCorner',
      users: [],
      userProfile: {},
      connectedProfile: []
    };
  },
  created() {
    http
      .get("users/list")
      .then(response => {
        console.log("Users list/axios request", response);
        this.users = response.data.userList;
        this.connectedProfile = response.data.connectedProfile;
      })
      .catch(err => {
        console.log("Cannot access users list : ", err);
        console.log("http: ", http);
        swal({
          title: "Unauthorized!",
          text: "You should log in first :)",
          icon: "warning",
          button: "OK"
        });
      });
  },
  methods: {
    getUserProfile(userID) {
      console.log("User profile id: ", userID);
      http
        .get("users/users/" + userID)
        .then(res => {
          console.log("Users component found this user:", res.data);
          this.userProfile = res.data;
          this.$router.push("/user-details/" + userID);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendMessageToUser(userID) {
      console.log("Message receiverID: ", userID);
      http
        .get("users/users/" + userID)
        .then(res => {
          console.log("Users component found this receiverID:", res.data);
          this.userProfile = res.data;
          this.$router.push("/message/" + userID);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.swal-title {
  font-family: Arial, Helvetica, sans-serif;
  color: #797979;
}

.swal-text {
  font-family: Arial, Helvetica, sans-serif;
  color: #797979;
}

.swal-button {
  padding: 7px 19px;
  border-radius: 2px;
  background-color: #ff9800;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  border: 3px solid #ffffff;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  border-radius: 0.5vw;
}

.swal-footer {
  background-color: #fff3e0;
  margin-top: 32px;
  border-top: 1px solid rgb(255, 223, 175);
}
</style>