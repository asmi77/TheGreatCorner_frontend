<template>
  <v-app>
    <div>
      <!-- $event corresponds to the 2d parameter of $emit -->
      <signup-form @userCreated='onclickForm($event)'></signup-form>

    </div>
  </v-app>
</template>

<script>
/* eslint-disable */
import SignupForm from "./components/SignupForm";
// import Router from 'vue-router'
import axios from "axios";
// import http from "@/helpers/http"

export default {
  name: "Signup",
  data() {
    return {
      title: "The GreatCorner",
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    //Geocoding functino
    onclickForm(userInput) {
      const userInfo = userInput;
      const address = userInput.userAddress;
      //Geocode the address
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: address,
            key: "AIzaSyBbUQrdF8wVfqQuihntr7uOOkssNBurFfM"
          }
        })
        .then(res => {
          console.log(
            "Res geocoding: ",
            res.data.results[0].geometry.location.lat
          );
          if (!res) {
            console.log("Please verify your address");
          } else {
            const userCoords = {
              lat: res.data.results[0].geometry.location.lat,
              lng: res.data.results[0].geometry.location.lng
            };

            const newUser = {
              userInfo,
              userCoords
            };
            console.log("coords", newUser);
            //create new user
            axios
              .post("http://localhost:8090/auth/create-user", newUser)
              .then(res => {
                console.log("réponse du then created user : ", res);
                console.log("New user created", res.config.data);
                swal({
                  title: "Good job!",
                  text: "Your account has been created :)",
                  icon: "success",
                  button: "Next step"
                });
                this.$router.push({ name: "Login" });
              })
              .catch(function(error) {
                console.log("Error has occurred:", error);
                swal({
                  title: "An Error has occured!",
                  text: "It looks like this user email already exists :)",
                  icon: "warning",
                  button: "Try with another e-mail"
                });
              });
          }
        })
        .catch(err => {
          console.log("Error geocoding: ", err);
        });
    }
  },
  components: {
    SignupForm
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
