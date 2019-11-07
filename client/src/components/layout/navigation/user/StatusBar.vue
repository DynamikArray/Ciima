<template>
  <div v-if="isLoggedIn">
    <v-slide-x-transition>
      <span class="caption" :key="status.time">
        {{ status.time | dateTime }} | {{ status.status }}
      </span>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      status: "api/lastStatus",
      isLoggedIn: "user/isLoggedIn",
      userName: "user/userName"
    })
  }
};
</script>

<style scoped></style>
