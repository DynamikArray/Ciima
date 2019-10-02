<template>
  <section>
    <v-app-bar app clipped-left clipped-right color="blue darken-3" dense>
      <div class="loadingIndicator">
        <v-progress-linear
          :indeterminate="Boolean(loading)"
          color="white"
          class=""
        ></v-progress-linear>
      </div>

      <v-app-bar-nav-icon
        @click.stop="toggleNavigationDrawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="mr-12 align-center">
        <router-link :to="'/'">
          <v-img
            v-ripple
            src="@/assets/logo.png"
            width="125px"
            class="mt-1"
            to="home"
          ></v-img>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <UserMenu></UserMenu>
    </v-app-bar>
  </section>
</template>

<script>
import UserMenu from "./user/UserMenu";
import { mapState } from "vuex";

export default {
  props: {
    toggleNavigationDrawer: [Function]
  },
  components: {
    UserMenu
  },
  computed: {
    ...mapState({
      draftDrawer: state => state.settings.draftDrawer,
      loading: state => state.api.loading
    })
  }
};
</script>

<style scoped>
.loadingIndicator {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
</style>
