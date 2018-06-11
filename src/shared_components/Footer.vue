<template>
  <v-footer class="brown lighten-3" height="150">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex xs12></v-flex>
        <v-flex xs4></v-flex>
        <v-flex xs4>
          <a href="#">
            <img class="footer__rsLogo" :src="require('@/assets/images/rs.png')" alt="">
          </a>
        </v-flex>
        <v-flex xs4></v-flex>
        <v-flex xs12>
          <p class="footer__copyright" align-center>The GreatCorner ©2018</p>
        </v-flex>
        <v-flex xs12></v-flex>
      </v-layout>
    </v-container>
  </v-footer>

</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

<style>
</style>
