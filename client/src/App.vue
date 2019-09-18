<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="navigationDrawer" />
    <DraftsDrawer :drawer="settingsDrawer" />
    <AppBar
      :toggleNavigationDrawer="toggleNavigationDrawer"
      :toggleSettingsDrawer="toggleSettingsDrawer"
    />
    <v-content>
      <TransitionPage>
        <router-view />
      </TransitionPage>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import DraftsDrawer from "@/components/layout/navigation/DraftsDrawer";
import NavigationDrawer from "@/components/layout/navigation/NavigationDrawer";
import AppBar from "@/components/layout/navigation/AppBar";
import TransitionPage from "@/components/layout/transition/TransitionPage";
import Footer from "@/components/layout/navigation/Footer";

export default {
  name: "App",
  components: {
    DraftsDrawer,
    NavigationDrawer,
    AppBar,
    TransitionPage,
    Footer
  },
  data: () => ({
    navigationDrawer: true,
    settingsDrawer: false
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    // TODO: move to vuex action/store
    toggleSettingsDrawer() {
      this.settingsDrawer = !this.settingsDrawer;
    },
    toggleNavigationDrawer() {
      this.navigationDrawer = !this.navigationDrawer;
    },
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
</style>
