<template>
  <div class="d-flex align-center justify-center px-1 pt-1 w-100 textShadow">
    <div
      v-for="page in pager"
      class="d-flex mx-1 align-center justify-center pa-1"
    >
      <v-btn
        class="px-1 grey darken-3"
        elevation="3"
        @click="gotoTheirIssuesResultPage(page.params)"
        style="min-width:32px;"
      >
        {{ formatButtonText(page.text) }}
      </v-btn>
    </div>
    <div class="d-flex align-center justify-end w-100" v-if="pager.length == 0">
      <h4 class="pb-1 pr-3">No more pages</h4>
    </div>
  </div>
</template>

<script>
//secondary darken-1
import { GET_THEIR_ISSUES_PAGE } from "@/store/action-types";
export default {
  props: {
    pagination: [Boolean, Object]
  },
  computed: {
    pager() {
      if (!this.pagination) return false;
      return this.pagination.pager || false;
    }
  },
  methods: {
    formatButtonText(text) {
      if (text === "Previous") return `Prev`;
      if (text === "Next") return `Next`;
      return text;
    },
    gotoTheirIssuesResultPage(params) {
      this.$store.dispatch(`pricematch/${GET_THEIR_ISSUES_PAGE}`, params);
    }
  }
};
</script>

<style scoped></style>
