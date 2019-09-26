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
        <img src="@/assets/logo.png" width="125px" class="mt-2" />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        text
        ripple
        small
        @click="toggleSettingsDrawer(!draftDrawer)"
        class="mr-1"
      >
        <v-icon class="mr-2">fa-clipboard-list</v-icon>Draft Data
      </v-btn>
    </v-app-bar>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { TOGGLE_DRAFT_DRAWER } from "@/store/mutation-types";

export default {
  props: {
    toggleNavigationDrawer: [Function]
  },
  computed: {
    ...mapState({
      draftDrawer: state => state.settings.draftDrawer,
      loading: state => state.api.loading
    })
  },
  methods: {
    toggleSettingsDrawer(value) {
      this.$store.commit(`settings/${TOGGLE_DRAFT_DRAWER}`, value);
    }
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
