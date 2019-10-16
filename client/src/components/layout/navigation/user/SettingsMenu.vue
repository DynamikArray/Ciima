<template>
  <div class="d-flex justify-end">
    <div
      class="d-flex justify-end align-center grow"
      v-if="isLoggedIn && userName"
    >
      <div class="d-flex align-center">
        <v-btn
          text
          ripple
          small
          @click="toggleSettingsDrawer(!draftDrawer)"
          class=""
        >
          <v-icon class="mr-1">fa fa-clipboard-list</v-icon>
          <div class="">
            Selected
          </div>
          <v-icon class="mx-1">fa fa-caret-down</v-icon>
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <v-menu
          :max-width="380"
          :nudge-bottom="38"
          v-model="blnMenu"
          :close-on-content-click="false"
          offset-x
        >
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
                <v-list-item-content>
                  <v-list-item-title>Default Product Type:</v-list-item-title>
                  <v-list-item-subtitle>
                    Applies defaults for Draft form fields.
                  </v-list-item-subtitle>
                  <div class="px-2">
                    <v-radio-group
                      row
                      :value="defaultProductType"
                      @change="changeDefaultProductType"
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
                    </v-radio-group>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";
import { mapGetters, mapState } from "vuex";
import {
  TOGGLE_DRAFT_DRAWER,
  SET_DEFAULT_PRODUCT_TYPE
} from "@/store/mutation-types";

export default {
  components: {
    avatar
  },
  data: () => ({
    blnMenu: false
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType,
      draftDrawer: state => state.settings.draftDrawer
    }),
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      userName: "user/userName"
    })
  },

  methods: {
    signInUser() {
      this.$router.push("/login");
    },
    signOutUser() {
      this.$store.dispatch("user/logout");
    },
    toggleSettingsDrawer(value) {
      this.$store.commit(`settings/${TOGGLE_DRAFT_DRAWER}`, value);
    },
    changeDefaultProductType(value) {
      this.$store.commit(`settings/${SET_DEFAULT_PRODUCT_TYPE}`, value);
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

<style scoped></style>
