<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <!-- Products list -->
        <v-flex xs4 class="cardStyle">
          <v-card>
            <v-toolbar color="brown lighten-3" dark>
              <v-toolbar-title class="text-xs-center">Available Products</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list three-line>
              <div v-for="(product, index) in products" :key="index">
                <v-list-tile :key="product.title" avatar ripple >
                  <v-list-tile-avatar>
                    <img :src="fetchImage(product.image)">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ product.title }} - {{ product.location }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ product.content }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ product.price }}€</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text> {{ product.createdDate }}</v-list-tile-action-text>
                      <v-btn icon @click="getAllProductDetails(product._id)">
                    <v-icon color="blue-grey">visibility</v-icon>
                  </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
              </div>
            </v-list>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
        <v-flex xs8>
          <div>
            <!-- geolocation  -->
            <div class="google-map" :id="map"></div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <div style="visibility: hidden;">
      <p>Store directly from Computed</p>
      <div>{{ storeProfile.myProfile.lat }}</div>
      <div>{{ storeProfile.myProfile.lng }}</div>
      <p>Store direct</p>
      <div>{{ this.$store.state.myProfile.lat }}</div>
      <div>{{ this.$store.state.myProfile.lng }}</div>
      <p>Store from .this computed</p>
      <div>{{ this.store.myProfile.lat }}</div>
      <div>{{ this.store.myProfile.lng }}</div>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import http from "../helpers/http.js";
import Router from "vue-router";

export default {
  name: "ProductsList",
  data() {
    return {
      title: "The GreatCorner",
      products: {},
      map: "map",
      pos: {},
      store: {},
      markers: []
    };
  },
  created() {
    http.get("products/last-products").then(response => {
      console.log("Products list", response.data);
      this.products = response.data;
      console.log("this.products created: ", this.products);
    });
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById(this.map), {
      center: {
        lat: parseFloat(this.store.myProfile.lat),
        lng: parseFloat(this.store.myProfile.lng)
      },
      zoom: 11
    });
    this.clearMarkers();
    this.buildMarkers();
  },
  computed: {
    storeProfile() {
      return (this.store = this.$store.state);
    },
    productsList() {
      return this.products;
    }
  },
  methods: {
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
   getAllProductDetails(productID) {
      console.log("Product id: ", productID);
      http
        .get("products/product-details/" + productID)
        .then(res => {
          console.log("Product details found:", res.data);
          this.productDetails = res.data;
          this.$router.push("/all-product-details/" + productID);
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchImage(path) {
      if (path) return "https://thegreatcornerbackend.herokuapp.com/" + path;
      console.log("here is my spoon url", path);
    },
    buildMarkers() {
      this.markers = [];
      for (var i = 0; i < this.products.length; i++) {
        var marker = new google.maps.Marker({
          position: {
            lat: parseFloat(this.products[i].lat),
            lng: parseFloat(this.products[i].lng)
          },
          map: this.map
        });
        this.markers.push(marker);
      }
    },
    clearMarkers() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    }
  },
  watch: {
    productsList() {
      this.clearMarkers();
      this.buildMarkers();
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  display: inline;
}
.google-map {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  background: gray;
}
</style>


