<template>
    <v-app>
        <div>
        </div>
        <div >
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12 md8 offset-md2>
                        <v-card>
                            <v-toolbar color="brown lighten-3" dark>
                                <!-- Back to users list -->
                                <v-btn flat icon @click="goUsersList">
                                    <v-icon color="white">arrow_back</v-icon>
                                </v-btn>
                                <v-toolbar-title>Compose your message</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn flat icon @click="sendMessage(newMessage)">
                                    <v-icon color="white">send</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-container fluid class="pa-0 mt-2">
                                <v-layout wrap>
                                    <!-- from part -->
                                    <v-flex xs12>
                                        <v-subheader>From</v-subheader>
                                        <v-chip>
                                            {{ $store.state.myProfile.email}}
                                        </v-chip>
                                    </v-flex>
                                    <!-- to part -->
                                    <v-flex xs12>
                                        <v-divider></v-divider>
                                        <v-subheader>To</v-subheader>
                                        <v-chip v-model="message.receiver">
                                            {{ userProfile.email}}
                                        </v-chip>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-divider></v-divider>
                                        <v-text-field label="Subject" single-line full-width hide-details v-model="message.title"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-divider></v-divider>
                                        <v-text-field label="Message" full-width multi-line single-line v-model="message.content"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div>
        </div>
    </v-app>
</template>

<script>
import axios from "axios";
import http from "../helpers/http.js";
import Router from "vue-router";
export default {
  name: "Message",
  data() {
    return {
      title: "The GreatCorner",
      userProfile: {},
      message: {},
      newMessage: {}
    };
  },
  created() {
    // setTimeout(() => location.reload(), 10);
    let userParamsID = this.$route.params.id;
    console.log("URL receiverID: ", userParamsID);
    // Retrieve user profile
    http
      .get("users/users/" + userParamsID)
      .then(res => {
        this.userProfile = res.data.content;
        console.log("Send message to receiverID: ", res.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    sendMessage(message) {
      const newMessage = {
        title: this.message.title,
        content: this.message.content,
        senderId: this.$store.state.myProfile.email,
        receiverId: this.userProfile.email
      };
      console.log("New message to be send", newMessage);
      http
        .post("messages/send-message", newMessage)
        .then(res => {
          this.$router.push("/users");
          swal({
            title: "Good job!",
            text: "You message have been posted :)",
            icon: "success",
            button: "Next step"
          });
        })
        .catch(err => {
          console.log("Your message has not been posted");
        });
    },
    signOut() {
      localStorage.removeItem("Token");
      console.log("You have signed out");
      setTimeout(() => {
        this.$router.push({
          name: "Login"
        });
      }, 500);
    },
    goWelcome() {
      this.$router.push("/");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goUsersList() {
      this.$router.push("/users");
    }
  }
};
</script>

<style>
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
  background-color: #bcaaa4;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  border-radius: 0.5vw;
}

.swal-footer {
  background-color: #c62828;
  margin-top: 32px;
  border-top: 1px solid rgb(255, 223, 175);
}
</style>
