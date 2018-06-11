<template>
  <v-app light>
    <div id="app">
      <v-content>
        <!-- main section  -->
        <section>
          <v-parallax :src="require('@/assets/images/echair.jpg')" height="600">
            <v-layout column align-center justify-center class="white--text">
              <div>
                <h1 class="title__h1">Welcome</h1>
              </div>
              <v-contain>
                <v-layout>
              <v-flex xs6>
              <v-btn outline class="brown lighten-3" dark large @click="goLogin">
                Log in to your space
              </v-btn>
              </v-flex>
              <v-flex xs6>
              <v-btn outline class="brown lighten-3" dark large @click="goSignup">
                Create a new account
              </v-btn>
              </v-flex>
                </v-layout>
              </v-contain>
            </v-layout>
          </v-parallax>
        </section>
        <!-- avatar section -->
        <section>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs6>
                <v-avatar class="avatar" :size="250" color="grey lighten-4">
                  <img class="imgLogo" :src="require('@/assets/images/find.png')" alt="">
                </v-avatar>
              </v-flex>
              <v-flex xs6>
                <v-avatar class="avatar" :size="250" color="grey lighten-4">
                  <img class="imgLogo" :src="require('@/assets/images/post.png')" alt="">
                </v-avatar>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
        <!-- pitch section  -->
        <section class="red darken-3">
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 class="pitch white--text">
                The GreatCorner, the easiest way to sell or find little things.
              </v-flex>
            </v-layout>
          </v-container>
        </section>
        
      </v-content>
    </div>
  </v-app>
</template>


<script>
export default {
  name: "Welcome",
  data() {
    return {
      gradient: "to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)"
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
     goSignup() {
      this.$router.push("/signup");
    },
  }
};
</script>

<style>

</style>
