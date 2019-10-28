<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    right
    width="640px"
    mobile-break-point="960"
    class="utilityDrawer"
  >
    <UtilityTabs></UtilityTabs>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { TOGGLE_UTILITY_DRAWER } from "@/store/mutation-types";
import UtilityTabs from "./UtilityTabs";

export default {
  components: {
    UtilityTabs
  },
  computed: {
    drawer: {
      set(blnOpen) {
        this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, blnOpen);
      },
      get() {
        return this.$store.state.settings.utilityDrawer;
      }
    }
  }
};
</script>

<style scoped></style>
