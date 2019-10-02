<template>
  <v-card
    elevation="10"
    color="grey darken-4"
    v-if="isLoggedIn && userName"
    class="text-center ma-3 pa-3 "
  >
    <v-layout align-center justify-center column>
      <v-flex>
        <avatar :username="userName" :size="140" class="ma-2"></avatar>
      </v-flex>
      <v-flex>
        <div class="my-1" style="max-width:180px;">
          <div class="text-truncate">
            <h3 class="my-1">{{ userName }}</h3>
            <h4>{{ email }}</h4>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import avatar from "vue-avatar";
import { mapGetters, mapState } from "vuex";

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
      userName: "user/userName",
      email: "user/email"
    })
  }
};
</script>

<style scoped></style>
