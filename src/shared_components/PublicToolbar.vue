<template>
  <v-toolbar class="red darken-3">
    <v-btn icon @click="goProductsList">
      <v-icon color="grey lighten-4">home</v-icon>
    </v-btn>
    <v-toolbar-title class="toolbar__title" v-text="title"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn class="toolbar__btnText" flat color="grey lighten-4" @click='goUsers'>Users</v-btn>
      <v-btn class="toolbar__btnText" flat color="grey lighten-4" @click='goListMessages'>My Messages</v-btn>
      <v-btn class="toolbar__btnText" flat color="grey lighten-4" @click='goMyProducts'>My Products</v-btn>
      <v-btn class="toolbar__btnText" flat color="grey lighten-4" @click='goMyProfile'>
        <span class="toolbar__displayFlex">
          <span class="toolbar__helloUser"> Hi {{ storeProfile.myProfile.userFirstName }}</span>
          <span>
            <v-icon>perm_identity</v-icon>
          </span>
        </span>
      </v-btn>
    </v-toolbar-items>
    <v-btn icon @click="signOut">
      <v-icon color="grey lighten-4">exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      title: "The GreatCorner"
    };
  },
  methods: {
    goProductsList() {
      let token = localStorage.getItem("Token");
      if (!token) {
        swal({
          title: "Unauthorized!",
          text: "You should log in first :)",
          icon: "warning",
          button: "OK"
        });
      } else {
        this.$router.push("/products-list");
      }
    },
    goUsers() {
      this.$router.push("/users");
    },
    goListMessages() {
      this.$router.push("/messages-list");
    },
    goMyProducts() {
      this.$router.push("/user-products");
    },
    goMyProfile() {
      this.$router.push("/profile");
    },
    signOut() {
      localStorage.removeItem("Token");
      console.log("You have signed out");
      setTimeout(() => {
        this.$router.push({
          name: "Login"
        });
      }, 500);
    }
  },
  computed: {
    storeProfile() {
      return (this.store = this.$store.state);
    }
  }
};
</script>

<style scoped>
</style>

