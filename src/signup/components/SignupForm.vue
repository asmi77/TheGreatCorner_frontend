<template>
  <v-app>
    <section class="brown lighten-3">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 class="pitch white--text">
            Create a new account
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <div class="form__layout">
      <form>
        <v-text-field label="Firstname" v-model="formData.fName" color="brown lighten-3" required></v-text-field>

        <v-text-field label="Lastname" v-model="formData.lName" color="brown lighten-3" required></v-text-field>

        <v-text-field label="E-mail" v-model="formData.username" color="brown lighten-3" required></v-text-field>

        <v-text-field label="Address" v-model="formData.userAddress.street" color="brown lighten-3" required></v-text-field>

        <v-text-field label="city" v-model="formData.userAddress.city" color="brown lighten-3" required></v-text-field>

        <v-text-field label="country" v-model="formData.userAddress.country" color="brown lighten-3" required></v-text-field>

        <v-text-field label="Password" type="password" v-model="formData.pswd" color="brown lighten-3" required></v-text-field>

        <v-text-field label="Confirm your password" type="password" v-model="formData.cpswd" color="brown lighten-3" required></v-text-field>

        <v-btn color="brown lighten-3 white--text" v-on:click="onSubmit" type="submit">Create a new user</v-btn>
      </form>
      <div class="text-xs-center">
        <v-btn round class="brown lighten-3" dark @click="goLogin">Already signed up ? Go to Login</v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
/* eslint-disable */
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SignupForm",
  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    password: { required, email },
    cpassword: { required, email }
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        userAddress: {
          street: "",
          city: "",
          country: ""
        },
        password: "",
        cpassword: ""
      }
    };
  },
  computed: {},
  methods: {
    onSubmit: function() {
      const formData = {
        firstName: this.formData.fName,
        lastName: this.formData.lName,
        email: this.formData.username,
        userAddress: this.formData.userAddress,
        password: this.formData.pswd,
        cpassword: this.formData.cpswd
      };
      console.log(
        "useraddress.city: ",
        formData.userAddress.city,
        "userAddress.country: ",
        formData.userAddress.country
      );

      //formData corresponds to $event in parent file
      this.$emit("userCreated", formData);
      console.log("Create user form values: ", formData);
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
</style>
