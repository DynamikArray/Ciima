<template>
  <v-navigation-drawer v-model="drawerState" app clipped right>
    <v-layout align-center justify-center column d-block mx-2>
      <v-flex text-left justify-center>
        <h3 class="mt-2">
          <v-icon small name="cog" class="mr-1">fa-cog</v-icon>Settings:
        </h3>
        <v-divider class="my-3"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center column d-flex>
      <v-flex align-content-space-around justify-center row>
        <v-flex align-self-center class="mx-2">
          <h4 class="mb-1">Dark Mode:</h4>
        </v-flex>
        <v-flex align-self-center class="mx-2">
          <v-switch v-model="darkMode" :label="darkModeState"></v-switch>
        </v-flex>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center column d-block mx-2>
      <v-flex text-left justify-center>
        <h3 class="mt-2">
          <v-icon small name="cog" class="mr-1">fas fa-info-circle</v-icon
          >Debug:
        </h3>
        <v-divider class="my-3"></v-divider>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center column d-flex>
      <v-flex align-content-space-around justify-center column>
        <h3>LIST OF DRAFTS</h3>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    drawer: [Boolean]
  },
  data: () => ({
    darkMode: false,
    drawerState: false
  }),
  watch: {
    darkMode(val) {
      this.$vuetify.theme.dark = val;
    },
    drawer: function(val) {
      this.drawerState = val;
    }
  },
  created() {
    this.darkMode = this.$vuetify.theme.dark;
  },
  computed: {
    darkModeState() {
      return this.darkMode ? "On" : "Off";
    }
  },
  methods: {}
};
</script>

<style scoped></style>
