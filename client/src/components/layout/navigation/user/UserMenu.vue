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
          <v-icon class="">fa-clipboard-list</v-icon>
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <v-menu offset-y nudge-bottom="6">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <avatar :username="userName" :size="34" class="mr-1"></avatar>
              <div class="" style="max-width:120px;">
                <div class="text-truncate">
                  {{ userName }}
                </div>
              </div>
            </v-btn>
          </template>
          <v-list>
            <v-subheader>User Menu:</v-subheader>
            <v-list-item-group>
              <v-list-item @click="logoutUser">
                <v-list-item-icon>
                  <v-icon>fa-sign-out-alt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Logout'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";
import { mapGetters, mapState } from "vuex";
import { TOGGLE_DRAFT_DRAWER } from "@/store/mutation-types";

export default {
  components: {
    avatar
  },
  computed: {
    ...mapState({
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
