<template>
  <div
    class="d-flex flex-col justify-center align-center"
    style="min-height:100%"
  >
    <div class="d-flex" style="min-width:500px">
      <div class="about text-center w-100">
        <h1 class="display-4">CiiMA</h1>
        <h4 class="">Comic Issues Inventory & Media Application</h4>
        <v-divider class="my-4"></v-divider>

        <div v-if="isLoggedIn">
          <h3>
            Welcome back
            <span class="username">{{ displayName }}</span>
          </h3>

          <!--
          <p>
            Choose of one the options below to get started.
          </p>

          <div class="d-flex justify-space-around">
            <div class="d-flex align-center">
              <v-btn color="primary" to="titles"
                ><v-icon class="mr-1">fa-search</v-icon> Titles</v-btn
              >
            </div>
            <div class="d-flex align-center">
              <v-btn color="primary" to="drafts"
                ><v-icon class="mr-1">fa-list-alt</v-icon>Drafts</v-btn
              >
            </div>
          </div>
        --></div>

        <h3 v-if="!isLoggedIn"><LoginForm></LoginForm></h3>

        <v-divider class="my-4"></v-divider>

        <h4>Brian Ridsdale © 2019</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LoginForm from "@/components/LoginForm/LoginForm";
export default {
  components: {
    LoginForm
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      userName: "user/userName",
      displayName: "user/displayName"
    })
  }
};
</script>

<style scoped>
.username {
  font-size: 135%;
  font-weight: light;
}
</style>
