<template>
  <div class="d-flex align-center justify-center px-1 pt-1 w-100 textShadow">
    <div v-for="page in pager" class="d-flex mx-1 align-center justify-center">
      <v-btn
        small
        text
        class="px-1"
        @click="gotoTheirIssuesResultPage(page.params)"
        style="min-width:32px;"
      >
        {{ page.text }}
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
    formattedPageText(text) {
      if (text === "Previous") return "Prev";
      return text;
    },
    gotoTheirIssuesResultPage(params) {
      this.$store.dispatch(`pricematch/${GET_THEIR_ISSUES_PAGE}`, params);
    }
  }
};
</script>

<style scoped></style>
