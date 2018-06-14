<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <!-- post product button  -->
        <v-flex xs12>
          <v-btn small color="brown lighten-3" dark @click="goSendProduct">Post a new Product</v-btn>
        </v-flex>
        <v-flex xs12 class="cardStyle">
          <v-card>
            <v-toolbar color="brown lighten-3" dark>
              <v-toolbar-title class="text-xs-center">My posted products</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-list three-line>
              <div v-for="(item, index) in items" :key="index">
                <v-list-tile :key="item.title" avatar ripple @click="toggle(index)">
                  <v-list-tile-avatar>
                    <img :src="fetchImage(item.image)">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }} - {{ item.location }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.content }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.price }}€</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <!-- More Details -->
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{item.createdDate | formateDate}}</v-list-tile-action-text>
                    <v-btn icon @click="getProductDetails(item._id)">
                      <v-icon color="blue-grey">visibility</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
              </div>
            </v-list>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import http from "../helpers/http.js";
import moment from "moment"; 
import 'moment/locale/fr';
export default {
  name: "UserProducts",
  data() {
    return {
      selected: [2],
      items: {}
    };
  },
  created() {
    http
      .get("products/user-products-list")
      .then(res => {
        this.items = res.data.userProducts;
        console.log("userProducts", res.data.userProducts);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goSendProduct() {
      this.$router.push("/send-product");
    },
    fetchImage(path) {
      if (path) return "https://thegreatcornerbackend.herokuapp.com/" + path;
      console.log("here is my spoon url", path);
    },
    getProductDetails(productID) {
      console.log("Product id: ", productID);
      http
        .get("products/product-details/" + productID)
        .then(res => {
          console.log("Product details found:", res.data);
          this.productDetails = res.data;
          this.$router.push("/product-details/" + productID);
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggle(index) {
      const i = this.selected.indexOf(index);

      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        this.selected.push(index);
      }
    }, 
  }, 
  filters : {
    formateDate(date) {
      return moment(date).format("DD/MM/YYYY"); 
    }
  }
};
</script>

<style scoped>
.margin {
  padding-top: 2vw;
  display: flex;
  flex-direction: column;
}
</style>

