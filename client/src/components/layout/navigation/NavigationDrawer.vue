<template>
  <v-navigation-drawer v-model="compDrawer" app clipped>
    <Usercard class="my-2" />
    <v-divider class="my-2"></v-divider>
    <v-layout align-start justify-center row>
      <v-flex class="px-1">
        <h4 class="text-center">Navigation:</h4>
        <v-list dense>
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="{ name: link.to }"
            class="noUnderline"
          >
            <v-list-item @click="">
              <v-list-item-action
                ><v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>{{ link.text }}</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Links from "./_navigationLinks";
import Usercard from "@/components/layout/user/Usercard";
export default {
  components: {
    Usercard
  },
  props: {
    drawer: [Boolean]
  },
  watch: {
    drawer: function(val) {
      this.compDrawer = val;
    }
  },
  data: () => ({
    compDrawer: false
  }),
  created() {
    this.links = Links;
  }
};
</script>

<style scoped>
.noUnderline {
  text-decoration: none;
}
</style>
