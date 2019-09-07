<template>
  <v-navigation-drawer
    :miniVariant="compDrawer"
    mini-variant-width="50"
    app
    clipped
    permanent
  >
    <div class="d-flex flex-column">
      <div class="d-flex justify-start flex-column">
        <div v-if="!compDrawer">
          <h3 class="text-center pl-1 pt-2">Main Menu</h3>
        </div>

        <div class="d-flex">
          <v-divider v-if="!compDrawer" class="my-2"></v-divider>
        </div>

        <v-list dense class="py-0">
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="{ name: link.to }"
            class="noUnderline"
          >
            <v-list-item @click="" v-ripple>
              <v-list-item-action :class="removeMargin()"
                ><v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content v-if="!compDrawer">{{
                link.text
              }}</v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list>
      </div>

      <div class="d-flex">
        <v-divider v-if="!compDrawer" class="my-2"></v-divider>
      </div>

      <div v-if="!compDrawer">
        <Usercard v-if="!compDrawer" class="my-2" />
      </div>
    </div>
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
    compDrawer: true
  }),
  created() {
    this.links = Links;
  },
  methods: {
    removeMargin() {
      if (this.compDrawer) {
        return "mr-0";
      }
    }
  }
};
</script>

<style scoped>
.noUnderline {
  text-decoration: none;
}
</style>
