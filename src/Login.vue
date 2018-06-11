<template>
  <v-app>
    <section class="brown lighten-3">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 class="pitch white--text">
            Log in
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <div class="form__layout">
      <form>
        <v-text-field label="E-mail" v-model="login.email" color="brown lighten-3" required></v-text-field>
        <v-text-field label="Password" type="password" v-model="login.pswd" color="brown lighten-3" required></v-text-field>
        <v-btn color="brown lighten-3 white--text" v-on:click="onLogin" type="submit">Log in</v-btn>
      </form>
      <div class="text-xs-center">
        <v-btn round class="brown lighten-3" dark @click="goSignup">Not yet signed up ? Go to Sign up</v-btn>
      </div>
    </div>

  </v-app>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    pswd: { required },
  },
  data() {
    return {
      title: "The GreatCorner",
      login: {
        email: "",
        pswd: ""
      },
      logData: {
        email: String,
        password: String
      }
    };
  },
  methods: {
    onLogin(evt) {
      evt.preventDefault();
      const logData = {
        email: this.login.email,
        password: this.login.pswd
      };
      console.log("Sent data inputs", logData);
      //Connect to the back
      axios
        .post("http://localhost:8090/auth/login", logData)
        //Send response object
        .then(res => {
          console.log("New user logged from vue:", res.data);
          //Store token in the localstorage
          localStorage.setItem("Token", res.data.token);
          swal({
            title: "Good job!",
            text: "You have been logged in :)",
            icon: "success",
            button: "Next step"
          });
          // Get token to be used in the headers through axios
          if (localStorage) {
            console.log(
              "Token has been stored in localstorage :",
              res.data.token
            );
            //Home page redirection
            setTimeout(() => {
              this.$router.push({ name: "ProductsList" });
            }, 1500);
          } else {
            console.log("Unauthorized");
          }
        })
        .catch(function(error) {
          console.log("Erreur :", error.response);
        });
    },
    goSignup() {
      this.$router.push("/signup");
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
