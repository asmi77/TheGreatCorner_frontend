<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <!-- product detail -->
        <v-flex xs6>
          <v-card>
            <v-card-media>
              <img :src="fetchImage(userProduct.image)">
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <v-form >
                  <v-text-field v-model="userProduct.title" v-if="show" label="Title" required></v-text-field>
                  <h3 v-else class="headline mb-0">{{ userProduct.title }}</h3>
                </v-form>
                <v-form >
                  <v-text-field v-model="userProduct.content" v-if="show" label="Content" required></v-text-field>
                  <div v-else>{{ userProduct.content}}</div>
                </v-form>
                <v-form >
                  <v-text-field v-model="userProduct.price" v-if="show" label="Price" required></v-text-field>
                  <div v-else>{{ userProduct.price}}€</div>
                </v-form>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

              <div v-if="show">
                <v-btn icon @click="updateUserProduct()">
                  <v-icon color="blue-grey">save_alt</v-icon>
                </v-btn>
                <v-btn icon @click="cancel()">
                  <v-icon color="blue-grey">cancel</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon @click="show=!show">
                  <v-icon color="blue-grey">create</v-icon>
                </v-btn>
                <v-btn icon @click="deleteUserProduct()">
                  <v-icon color="blue-grey">delete</v-icon>
                </v-btn>
              </div>

            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <!-- mapping product -->
          <div id="map"></div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import http from "../helpers/http.js";
export default {
  name: "ProductDetails",
  data() {
    return {
      userProduct: {},
      show: false
    };
  },
  created() {
    let ProductParamsID = this.$route.params.id;
    http
      .get("products/product-details/" + ProductParamsID)
      .then(res => {
        this.userProduct = res.data.foundProduct;
        console.log("Displayed product is : ", res.data.foundProduct);
      })
      .catch(err => {
        console.log("There is an error: ", err);
      });
  },
  mounted() {
    initMap();
    function initMap() {
      var position = { lat: 48.86306320000001, lng: 2.5262081 };
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: position
      });
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
    }
  },
  methods: {
    fetchImage(path) {
      if (path) return "https://thegreatcornerbackend.herokuapp.com/" + path;
    },
    updateUserProduct() {
      http
        .put("products/product-details", this.userProduct)
        .then(res => {
          swal({
            type: "success",
            title: "Product upadating: ",
            text: "Product successfully updated"
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
    deleteUserProduct() {
      let ProductParamsID = this.$route.params.id;
      console.log("deleteUserProduct", ProductParamsID);
      http
        .delete("products/product-details/" + ProductParamsID)
        .then(res => {
          swal({
            title: "Good job!",
            text: "Product successfully deleted :)",
            icon: "success",
            button: "Next step"
          });
          this.$router.push({ name: "UserProducts" });
        })
        .catch(err => {
          console.log("err delete: ", err);
        });
    }
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 400px;
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
  background-color: #bcaaa4;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  border-radius: 0.5vw;
}

.swal-footer {
  background-color: #c62828;
  margin-top: 32px;
  border-top: 1px solid rgb(255, 223, 175);
}
</style>

