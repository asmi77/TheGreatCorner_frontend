<template>
    <v-app class="margin">
        <!-- left container  -->
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs12 class="profile__cardBox">
              <v-card-media src="" height="130px">
                <v-layout column class="media">
                <div class="display-1 pl-5 pt-5"> <span class="profile__cardBox">My Profile</span></div>
                  <v-card-title>
                    <div v-if="show">
                    <v-btn dark icon @click="updateMyprofile">
                      <v-icon color="white">save_alt</v-icon>
                    </v-btn>
                    <v-btn icon @click="cancel()">
                  <v-icon color="white">cancel</v-icon>
                </v-btn>
                    </div>
                    <div v-else>
                <v-btn icon @click="show=!show">
                  <v-icon color="white">create</v-icon>
                </v-btn>
              </div>
                  </v-card-title>
                </v-layout>
              </v-card-media>
              <v-list two-line>
                <!-- personal e-mail -->
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="blue-grey">mail</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ profile.email}}</v-list-tile-title>
                    <v-list-tile-sub-title>E-mail</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="blue-grey">location_on</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>57, rue du bois des près</v-list-tile-title>
                    <v-list-tile-sub-title>Melun, France</v-list-tile-sub-title>
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
  name: "Profile",
  data() {
    return {
      profile: {}, 
      show: false
    };
  },
  created() {
    //Retrieve user profile
    http
      .get("/profile")
      .then(res => {
        this.profile = res.data.profile;
        // this.profile = res.data.content;
        // // server response
        console.log(
          "Profile component displays my profile: ",
          res.data
        );
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goMyMessages() {
      this.$router.push("/message");
    },

    goMyProducts() {
      this.$router.push("/user-products");
    },

    goUsersList() {
      this.$router.push("/users");
    }, 
    updateMyprofile() {
      http
        .put("products/product-details", this.profile)
        .then(res => {
          swal({
            type: "success",
            title: "Profile update: ",
            text: "Profile successfully updated"
          });
          setTimeout(() => location.reload(), 1500);
        })
        .catch(error => {
          console.log("error:", error.response.data);
        });
    },
    cancel() {
      location.reload();
    },
  }
};
</script>

<style scoped>
.margin {
  padding-top: 2vw;
  display: flex;
  flex-direction: column;
}
.cardStyle {
  background-color: orange;
}

.displayFlex {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: 8vw;
}
</style>

