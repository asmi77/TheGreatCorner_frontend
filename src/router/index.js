import Vue from "vue";
import router from "vue-router";
import Welcome from "@/Welcome";
import Signup from "@/signup/Signup";
import Login from "@/Login";
import ProductsList from "@/products/ProductsList";
import UserProducts from "@/products/UserProducts";
import SendProduct from "@/products/SendProduct";
import ProductDetails from "@/products/ProductDetails";
import AllProductDetails from "@/products/AllProductDetails"; 
import Users from "@/users/Users";
import UserDetails from "@/users/UserDetails";
import Message from "@/messages/Message";
import MessageList from "@/messages/MessageList";
import MessageDetails from "@/messages/MessageDetails";
import Profile from "@/profile/Profile";
import Navbar from "./../shared_components/Navbar.vue";
import Toolbar from "./../shared_components/PublicToolbar.vue";
import Footer from "./../shared_components/Footer.vue"; 

Vue.use(router);

export default new router({
  routes: [
    {
      path: "/",
      name: "Welcome",
      components: {
        default: Welcome,
        Navbar: Navbar, 
        Footer: Footer
      }
    },
    {
      path: "/signup",
      name: "Signup",
      components: {
        default: Signup,
        Navbar: Navbar, 
        Footer: Footer
      }
    },
    {
      path: "/login",
      name: "Login",
      components: {
        default: Login,
        Navbar: Navbar, 
        Footer: Footer
      }
    },
    {
      path: "/products-list",
      name: "ProductsList",
      components: {
        default: ProductsList,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/user-products",
      name: "UserProducts",
      components: {
        default: UserProducts,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/send-product",
      name: "SendProduct",
      components: {
        default: SendProduct,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/product-details/:id",
      name: "ProductDetails",
      components: {
        default: ProductDetails,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/all-product-details/:id",
      name: "AllProductDetails",
      components: {
        default: AllProductDetails,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/users",
      name: "Users",
      components: {
        default: Users,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/user-details/:id",
      name: "UserDetails",
      components: {
        default: UserDetails,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/message/:id",
      name: "Message",
      components: {
        default: Message,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/messages-list",
      name: "MessageList",
      components: {
        default: MessageList,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/message-details/:id",
      name: "MessageDetails",
      components: {
        default: MessageDetails,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    },
    {
      path: "/profile",
      name: "Profile",
      components: {
        default: Profile,
        Toolbar: Toolbar, 
        Footer: Footer
      }
    }
  ]
});
