<template>
  <v-toolbar class="red darken-3">
    <v-btn icon @click="goWelcome">
      <v-icon color="grey lighten-4">home</v-icon>
    </v-btn>
    <v-toolbar-title class="toolbar__title" v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="goSignup">
      <v-icon color="grey lighten-4">person_add</v-icon>
    </v-btn>
    <v-btn icon @click="goLogin">
      <v-icon color="grey lighten-4">person</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      title: "The GreatCorner"
    };
  },
  methods: {
    goWelcome() {
      //another welcome page for connected persons ? Like Home page ?
      this.$router.push("/");
    },
    goSignup() {
      this.$router.push("/signup");
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.displayFlex {
  display: flex;
  flex-direction: column;
}

.hello {
  font-size: 11px;
  font-style: italic;
}

.btnText {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 1.5vw;
}
</style>

