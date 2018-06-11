<template>
  <div class="homepage">
    <!-- Display Welcome page -->
    <router-view name="Toolbar"></router-view>
    <router-view name="Navbar"></router-view>
    <router-view></router-view>
    <router-view name="Footer"></router-view>
    <!-- <ProductsList-map
  name="ProductsList"
></ProductsList-map> -->
  </div>
</template>

<script>
/* eslint-disable */
import Welcome from "./Welcome.vue";
import Signup from "./signup/Signup";
import Login from "./Login";
import ProductsList from "./products/ProductsList.vue";
import UserProducts from "./products/UserProducts.vue";
import SendProduct from "./products/SendProduct.vue";
import ProductDetails from "./products/ProductDetails.vue";
import Users from "./users/Users";
import UserDetails from "./users/UserDetails";
import Message from "./messages/Message.vue";
import MessageList from "./messages/MessageList.vue";
import MessageDetails from "./messages/MessageDetails.vue";
import Profile from "./profile/Profile.vue";
import Router from "vue-router";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
  },
  components: {
    Welcome,
    Signup,
    Login,
    ProductsList,
    UserProducts,
    SendProduct,
    ProductDetails,
    Users,
    UserDetails,
    Message,
    MessageList,
    MessageDetails,
    Profile
  }
};
</script>

<style>
</style>
