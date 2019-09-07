<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="navigationDrawer" />
    <SettingsDrawer :drawer="settingsDrawer" />
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
import SettingsDrawer from "@/components/layout/navigation/SettingsDrawer";
import NavigationDrawer from "@/components/layout/navigation/NavigationDrawer";
import AppBar from "@/components/layout/navigation/AppBar";
import TransitionPage from "@/components/layout/transition/TransitionPage";
import Footer from "@/components/layout/navigation/Footer";

export default {
  name: "App",
  components: {
    SettingsDrawer,
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
