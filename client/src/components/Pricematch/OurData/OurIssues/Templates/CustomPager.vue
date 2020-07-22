<template>
  <div
    v-if="ourSelectedTitle"
    class="d-flex align-center justify-center px-1 pt-1 textShadow"
  >
    <v-pagination
      :key="Date.now()"
      :value="page"
      @input="handleInput"
      :length="pageCount"
      total-visible="5"
      prev-icon="fa-caret-left"
      next-icon="fa-caret-right"
    ></v-pagination>
  </div>
</template>

<script>
import { SEARCH_OUR_ISSUES } from "@/store/action-types.js";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    pagination: [Boolean, Object]
  },
  computed: {
    page() {
      return this.pagination.page;
    },
    pageCount() {
      return this.pagination.pageCount;
    }
  },
  methods: {
    handleInput(page) {
      const title = this.ourSelectedTitle.title;
      this.$store.dispatch(`pricematch/${SEARCH_OUR_ISSUES}`, {
        title,
        page
      });
    }
  }
};
</script>

<style scoped></style>
