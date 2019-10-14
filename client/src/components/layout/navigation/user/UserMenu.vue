<template>
  <div class="d-flex justify-end">
    <!--NOT LOGGED IN -->
    <div class="d-flex align-center" v-if="!isLoggedIn && !userName">
      <v-btn
        v-if="!isLoggedIn"
        text
        ripple
        small
        @click="signInUser"
        class="mr-1"
      >
        <v-icon class="mr-2">fa-sign-in-alt</v-icon>Login
      </v-btn>
    </div>
    <!--LOGGED IN -->
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
          <v-icon class="mr-1">{{ setDefaultProductTypeIcon() }}</v-icon>
          <span class="">Current Draft <br />({{ defaultProductType }}) </span>
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <v-menu
          :max-width="380"
          :nudge-bottom="42"
          v-model="blnMenu"
          :close-on-content-click="false"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <v-icon class="mr-1">fas fa-user-cog</v-icon>
              <div class="" style="max-width:80px;">
                <div class="text-truncate">
                  {{ userName }}
                </div>
              </div>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <avatar :username="userName" :size="35" class="mr-1"></avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ userName }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Set your preferences below:</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

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

            <v-divider></v-divider>

            <v-card-actions>
              <div class="d-flex justify-end grow py-2">
                <div class="d-flex align-center">
                  <v-btn color="red" @click="logoutUser"
                    ><v-icon class="mr-1">fa-sign-out-alt</v-icon>Logout</v-btn
                  >
                </div>
              </div>
            </v-card-actions>
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
    setDefaultProductTypeIcon() {
      const type = this.defaultProductType;
      switch (type) {
        case "sets":
          return "fa-layer-group";
          break;
        case "singles":
          return "fa-image";
          break;
        default:
          return "fa-clipboard";
          break;
      }
    },
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
