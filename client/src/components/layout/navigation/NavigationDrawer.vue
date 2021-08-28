<template>
  <v-navigation-drawer ref="mainNavigationDrawer" :miniVariant="compDrawer" mini-variant-width="54" app clipped permanent>
    <vuescroll :ops="ops" class="">
      <div class="HideOverflowY mb-0 pr-2">
        <div class="d-flex flex-column">
          <div class="d-flex justify-start flex-column">
            <div v-if="!compDrawer">
              <h3 class="text-center pl-1 pt-2">Main Menu</h3>
            </div>

            <div class="d-flex">
              <v-divider v-if="!compDrawer" class="my-2"></v-divider>
            </div>

            <v-list v-if="loggedIn" dense class="py-0">
              <div v-for="link in links">
                <router-link
                  v-if="!link.menuDivider && hasLinkPermission(link)"
                  :key="link.text"
                  :to="{ name: link.to }"
                  class="noUnderline"
                >
                  <v-list-item @click="" v-ripple>
                    <v-list-item-action :class="removeMargin()"
                      ><v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content v-if="!compDrawer">{{ link.text }}</v-list-item-content>
                  </v-list-item>
                </router-link>
                <v-divider v-if="link.menuDivider && hasLinkPermission(link)" class="my-1"></v-divider>
              </div>
            </v-list>

            <v-list v-else>
              <v-list-item v-if="!compDrawer" class="text-center pa-2 mx-2 mb-3">
                <v-list-item-content v-if="!compDrawer">
                  <h4>
                    You must be signed in to continue using the application.
                  </h4>
                </v-list-item-content>
              </v-list-item>

              <v-divider v-if="!compDrawer" class="my-1"></v-divider>
              <router-link to="login" class="noUnderline">
                <v-list-item @click="" v-ripple>
                  <v-list-item-action :class="removeMargin()"><v-icon>fa-sign-in-alt</v-icon> </v-list-item-action>

                  <v-list-item-content v-if="!compDrawer">Sign In</v-list-item-content>
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
      </div>
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import Links from "./_navigationLinks";
import Usercard from "@/components/layout/user/Usercard";
export default {
  components: {
    Usercard,
    vuescroll
  },
  props: {
    drawer: [Boolean],
    loggedIn: [Boolean, Object]
  },
  watch: {
    drawer: function(val) {
      this.compDrawer = val;
    }
  },
  data: () => {
    scrollbarSettings.bar.keepShow = false;
    scrollbarSettings.bar.onlyShowBarOnScroll = true;
    scrollbarSettings.rail.keepShow = false;
    return {
      compDrawer: true,
      ops: scrollbarSettings
    };
  },
  created() {
    this.links = Links;
  },
  computed: {},
  methods: {
    hasLinkPermission(link) {
      /* Allow links with no roles */
      if (!link.roles) return true;
      /* Check for isManager, this really could be more dynamic as we move fwd */
      if (link.roles && link.roles.includes("isManager")) return this.$store.getters["user/isManager"];
      /*made it through all other checks we didnt account for */
      return false;
    },
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
