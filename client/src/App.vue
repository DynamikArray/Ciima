<template>
  <v-app>
    <NavigationDrawer
      :loggedIn="isLoggedIn && user"
      :drawer="navigationDrawer"
    />
    <UtilityDrawer />
    <AppBar :toggleNavigationDrawer="toggleNavigationDrawer" />
    <v-content>
      <TransitionPage>
        <router-view />
      </TransitionPage>
    </v-content>
    <Footer v-if="isLoggedIn && user" />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

import UtilityDrawer from "@/components/layout/navigation/UtilityDrawer/UtilityDrawer";

import NavigationDrawer from "@/components/layout/navigation/NavigationDrawer";
import AppBar from "@/components/layout/navigation/AppBar";
import TransitionPage from "@/components/layout/transition/TransitionPage";
import Footer from "@/components/layout/navigation/Footer";

export default {
  name: "App",
  components: {
    AppBar,
    NavigationDrawer,
    //DraftsDrawer,
    UtilityDrawer,
    TransitionPage,
    Footer
  },
  data: () => ({
    navigationDrawer: true
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      user: "user/user"
    })
  },
  created() {
    //this can get moved to user settings once we get taht sorted
    this.$vuetify.theme.dark = true;
    //check if we have a token, and then get this account
    if (!this.isLoggedIn) this.$store.dispatch("user/account");
  },
  methods: {
    created: function() {},

    toggleNavigationDrawer() {
      this.navigationDrawer = !this.navigationDrawer;
    },

    /*HANDLE SIZING OF THE WINDOW TRANSITION*/
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<style>
body {
  /* HACK: FOR NOTIFICATIONS */
  font-family: "Roboto";
}
.h-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.ourToast {
  box-shadow: 2px solid #000;
}
.textShadow {
  text-shadow: 1px 1px 1px #000;
}
</style>
