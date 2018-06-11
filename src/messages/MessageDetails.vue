<template>
  <v-app >
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 class="cardStyle">
            <v-card-media src="" height="100px">
              <v-layout column class="media">
                <v-card-title>
                  <v-btn dark icon @click="goMessageList">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-5 pt-5">
                  <div > </div>
                </v-card-title>
              </v-layout>
            </v-card-media>
            <v-list two-line>
              <!-- Mobile phone -->
              <v-list-tile>
                <v-list-tile-action>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>From</v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{ userMessage.senderId}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <!-- personal e-mail -->
              <v-divider inset></v-divider>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>To</v-list-tile-title>
                  <v-list-tile-sub-title>{{ userMessage.receiverId}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Subject</v-list-tile-title>
                  <v-list-tile-sub-title>{{ userMessage.title }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="indigo"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Message</v-list-tile-title>
                  <v-list-tile-sub-title>{{ userMessage.content }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
import http from "../helpers/http.js";
export default {
  data() {
    return {
      name: "MessageDetails",
      userMessage: {}
    };
  },
  created() {
    let messageParamsID = this.$route.params.id;
    http
      .get("messages/show-message/" + messageParamsID)
      .then(res => {
        console.log(
          "MessageDetails component found this message with id:",
          res.data
        );
        this.userMessage = res.data.messageID;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goMessageList() {
      this.$router.push("/messages-list");
    }
  }
};
</script>

<style>

.cardStyle {
  background-color: #BCAAA4;
}

.displayFlex {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 8vw;
}
</style>
