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
        <v-menu
          :max-width="380"
          :nudge-bottom="42"
          v-model="blnMenu"
          :close-on-content-click="false"
          offset-x
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <avatar :username="userName" :size="30" class="mr-1"></avatar>
              <div class="" style="max-width:130px;">
                <div class="text-truncate">
                  {{ userName }}
                </div>
              </div>
              <v-icon class="mr-1">fa fa-caret-down</v-icon>
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
                  <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
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

export default {
  components: {
    avatar
  },
  data: () => ({
    blnMenu: false
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      userName: "user/userName",
      userEmail: "user/email"
    })
  },

  methods: {
    signInUser() {
      this.$router.push("/login");
    },
    signOutUser() {
      this.$store.dispatch("user/logout");
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
