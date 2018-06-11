<template>
    <v-app>
        <div>
                <form @submit.prevent="postProduct">
                    <v-container fluid class="form__layout">
                        <v-layout row wrap>
                            <!-- Product title -->
                            <v-flex xs12>
                                <v-form enctype="multipart/form-data">
                                    <v-text-field v-model="form.title" label="Product Title"></v-text-field>
                                </v-form>
                            </v-flex>
                            <!-- Product content  -->
                            <v-flex xs12>
                                <v-form>
                                    <v-text-field v-model="form.content" label="Product Content" multi-line></v-text-field>
                                </v-form>
                            </v-flex>
                            <!-- Product price -->
                            <v-flex xs12>
                                <v-form>
                                    <v-text-field v-model="form.price" label="Product Price"></v-text-field>
                                </v-form>
                            </v-flex>
                            <!-- Product location -->
                            <v-flex xs12>
                                <v-select :items="states" v-model="form.location" label="Location" single-line></v-select>
                            </v-flex>
                            <!-- upload image -->
                            <v-layout>
                                <v-flex xs6>
                                    <v-btn color="brown lighten-3" dark @click="triggerInputFile">
                                        <v-icon>backup</v-icon>
                                        <span>Upload</span>
                                    </v-btn>
                                    <input type="file" enctype="multipart/form-data" style="display: none" ref="imageInput" accept="image/*" @change="onImagePicked">
                                </v-flex>
                                <!-- Display the picked image -->
                                <v-flex xs6 sm6 offset-sm3>
                                    <img :src="imageURL" height="150">
                                </v-flex>
                            </v-layout>
                            <v-btn color="brown lighten-3" dark type="submit">Post a product
                            </v-btn>
                        </v-layout>
                    </v-container>
                </form>
</div>
</v-app>
</template>


<script>
import http from "../helpers/http.js";

export default {
  name: "SendProduct",
  data() {
    return {
      form: {
        title: "",
        content: "",
        image: "",
        price: ""
      },
      imageURL: "",
      states: ["Belgique", "France", "Italie", "Russie", "Japon"]
    };
  },
  methods: {
    postProduct() {
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("content", this.form.content);
      formData.append("image", this.form.image, this.form.image.name);
      formData.append("price", this.form.price);
      console.log("FormData: ", formData);
      let config = { headers: { "Content-Type": undefined } };
      http
        .post("products/send-product", formData, config)
        .then(res => {
          swal({
            title: "Good job!",
            text: "Your product has been posted :)",
            icon: "success",
            button: "Next step"
          });
          this.$router.push("/user-products");
        })
        .catch(err => {
          console.log("Error : product not saved");
        });
    },
    triggerInputFile() {
      //$refs gives access to all ref attributes in this template
      //uploadImage triggers the input 'type = file'
      this.$refs.imageInput.click();
    },
    //event = the default event related to this method
    onImagePicked(event) {
      this.form.image = event.target.files[0];
      let files = event.target.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file) {
      let fileReader = new FileReader();
      fileReader.onload = event => {
        this.imageURL = event.target.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
};
</script>

<style>
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
