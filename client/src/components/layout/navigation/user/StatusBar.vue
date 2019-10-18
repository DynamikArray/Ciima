<template>
  <div v-if="isLoggedIn">
    <span class="caption">
      Last Operation:
      {{ status }}
    </span>
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
