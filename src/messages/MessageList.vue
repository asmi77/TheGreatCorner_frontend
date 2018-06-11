<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-toolbar color="brown lighten-3" dark>
              <v-toolbar-title class="text-xs-center">Inbox</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
            </v-toolbar>
            <v-list two-line>
              <v-subheader>My Messages</v-subheader>
              

              <v-list-tile v-for="(message, index) in messagesList" :key="index">
                <v-list-tile-avatar>
                  <img src="https://vuetifyjs.com/static/doc-images/lists/2.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title color="blue-grey ">
                    {{ message.senderId }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{ message.title }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <!-- send message button -->
                <v-list-tile-action>
                  <v-btn flat icon color="blue-grey " v-if="message.read != read" @click="readMessage(message._id)">
                    <v-icon>mail</v-icon>
                  </v-btn>
                  <v-btn flat icon color="grey" v-else @click="markUnread(message._id)">
                    <v-icon>drafts</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>


<script>
import axios from "axios";
import http from "../helpers/http.js";
import Router from "vue-router";

export default {
  name: "MessageList",
  data() {
    return {
      title: "The GreatCorner",
      messagesList: [],
      showMessageID: {},
      show: true,
      read: true
    };
  },
  // Displays list messages of current user
  created() {
    http
      .get("messages/messages-list")
      .then(response => {
        console.log(".then My messages", response.data.userMessages);
        this.messagesList = response.data.userMessages;
      })
      .catch(err => {
        console.log("Cannot access my messages : ", err);
        swal({
          text: "Your inbox is empty :)",
          icon: "warning",
          button: "OK"
        });
      });
  },
  methods: {
    readMessage(messageID) {
      console.log("User Message details: ", messageID);
      http
        .get("messages/show-message/" + messageID)
        .then(res => {
          console.log(
            "MessageList component found this message:",
            res.data.messageID
          );
          this.showMessageID = res.data.messageID;
          this.$router.push("/message-details/" + messageID);
        })
        .catch(err => {
          console.log(err);
        });
    },
    markUnread(messageID) {
      http
        .put("messages/update-message-details/" + messageID)
        .then(res => {
          console.log(
            "MessageList component found this message:",
            res.data.messageID
          );
          this.showMessageID = res.data.messageID;
          setTimeout(() => location.reload(), 0);
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