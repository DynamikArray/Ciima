<template>
  <div class="d-flex justify-end">
    <div class="d-flex justify-end align-center grow" v-if="isLoggedIn && userName">
      <!-- UNUSED COMPONENTS
      <div class="d-flex align-center" v-if="!isLots">
        <v-btn
          text
          ripple
          small
          @click="toggleUtilityDrawer(true, 1)"
          class=""
          v-shortkey="['ctrl', 'alt', 'p']"
          @shortkey="toggleUtilityDrawer(true, 1)"
        >
          <v-icon class="mr-1">fa fa-dollar-sign</v-icon>
          <div class="">
            Prices
          </div>
        </v-btn>

        <v-btn
          text
          ripple
          small
          @click="toggleUtilityDrawer(true, 0)"
          class=""
          v-shortkey="['ctrl', 'alt', 's']"
          @shortkey="toggleUtilityDrawer(true, 0)"
        >
          <v-icon class="mr-1">fa fa-tasks</v-icon>
          <div class="">
            Selected
          </div>
        </v-btn>
      </div>
      -->

      <div class="d-flex align-center">
        <v-menu :max-width="380" :nudge-bottom="38" v-model="blnMenu" :close-on-content-click="false" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn small text v-on="on">
              <v-icon claass="mr-1 x-small">fa fa-cog</v-icon>
              <div class="text-center mx-1">
                <div>({{ defaultProductType }})</div>
              </div>
              <v-icon class="mr-1">fa fa-caret-down</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content class="mb-0 pb-0">
                  <v-list-item-title>Default Product Type:</v-list-item-title>
                  <v-list-item-subtitle>
                    Applies defaults for Draft form fields.
                  </v-list-item-subtitle>

                  <div id="defaultProductWrapper" class="secondary darken-1 my-2" style="border-radius:6px;">
                    <v-radio-group row :value="defaultProductType" @change="changeDefaultProductType" class="w-100">
                      <div class="d-flex flex-column justify-center align-center w-100">
                        <!-- Disabled ETS/SINGLES/ADULT SELECTOR
                        <div
                          class="d-flex my-1 justify-space-around align-center w-100"
                        >
                          <v-radio
                            label="Sets"
                            color="primary"
                            value="sets"
                          ></v-radio>
                          <v-radio
                            label="Singles"
                            color="primary"
                            value="singles"
                          ></v-radio>
                          <v-radio
                            label="Adult"
                            color="primary"
                            value="adult"
                          ></v-radio>
                        </div>

                        <v-divider class="w-100 my-2"></v-divider>
                      END SETS/SINGLES/ADULT SELECTOR  -->

                        <div class="d-flex justify-space-around align-center w-100 my-1 mt-2">
                          <v-radio label="Lots" color="primary" value="lots"></v-radio>
                          <v-radio label="Gtc" color="primary" value="gtc"></v-radio>
                        </div>
                      </div>
                    </v-radio-group>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Utility Drawer</v-list-item-title>
                  <v-list-item-subtitle>
                    Adjust the width of the right side Utility drawer.
                  </v-list-item-subtitle>

                  <v-slider
                    class="mt-2 mb-0"
                    prepend-icon="fa fa-arrow-alt-circle-left"
                    append-icon="fa fa-arrow-alt-circle-right"
                    min="25"
                    max="75"
                    v-model="utilityDrawerWidth"
                    hide-details
                  ></v-slider>
                  <div class="text-center">{{ 100 - utilityDrawerWidth }}% Wide</div>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Shortcut Keys</v-list-item-title>
                  <v-list-item-subtitle>
                    Shortcut Keys to navigate open utility drawer tabs
                  </v-list-item-subtitle>
                  <div class="text-left">
                    <div class="ma-1">
                      <v-chip color="info lighten-2" label outlined>
                        CTRL + ALT + P
                      </v-chip>
                      Open Prices tab.
                    </div>
                    <div class="ma-1">
                      <v-chip color="info lighten-2" label outlined>
                        CTRL + ALT + S
                      </v-chip>
                      Open Selected tab.
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="d-flex justify-end grow">
                  <v-btn @click="closeSettingsMenu" color="success"><v-icon class="mr-1">fa fa-times</v-icon>Close</v-btn>
                </div>
              </v-card-actions>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  TOGGLE_UTILITY_DRAWER,
  SET_DEFAULT_PRODUCT_TYPE,
  UTILITY_DRAWER_WIDTH,
  UTILITY_DRAWER_TAB
} from "@/store/mutation-types";

export default {
  data: () => ({
    blnMenu: false,
    blnPrices: false,
    blnSelected: false
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType,
      utilityDrawer: state => state.settings.utilityDrawer,
      utilityDrawerTab: state => state.settings.utilityDrawerTab
    }),
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      userName: "user/userName"
    }),
    utilityDrawerWidth: {
      set(width) {
        this.$store.commit(`settings/${UTILITY_DRAWER_WIDTH}`, width);
      },
      get() {
        return this.$store.state.settings.utilityDrawerWidth;
      }
    },
    isLots() {
      if (this.defaultProductType === "lots") return true;
      return false;
    }
  },

  methods: {
    closeSettingsMenu() {
      this.blnMenu = false;
    },
    signInUser() {
      this.$router.push("/login");
    },
    signOutUser() {
      this.$store.dispatch("user/logout");
    },
    toggleUtilityDrawer(value, tab) {
      this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, value);
      this.$store.commit(`settings/${UTILITY_DRAWER_TAB}`, tab);
    },
    changeDefaultProductType(value) {
      this.$store.commit(`settings/${SET_DEFAULT_PRODUCT_TYPE}`, value);
      this.$toastr.defaultTimeout = 1000;
      this.$toastr.s("Setting updated!");
      this.$toastr.defaultTimeout = 1500;
      this.closeSettingsMenu();
    },
    async logoutUser() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Logout of application?</h3>
        <p>You will have to log back in to continue, are you sure?</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style>
#defaultProductWrapper > .v-input {
  margin: 0px;
}

#defaultProductWrapper > .v-input > .v-input__control {
  width: 100%;
}

#defaultProductWrapper .v-input > .v-input__control > .v-input__slot {
  margin: 0%;
}
</style>
