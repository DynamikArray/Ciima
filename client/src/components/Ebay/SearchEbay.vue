<template>
  <v-card>
    <v-card-text>
      <v-form v-model="validEbaySearch" @submit.prevent="searchEbay">
        <v-text-field
          autofocus
          hide-details
          persistent-hint
          v-model="keywords"
          label="Search Public Ebay Listings"
          prepend-icon="fa-search"
          @input="searchEbay"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import debounce from "lodash.debounce";
import { SEARCH_EBAY } from "@/store/action-types";

export default {
  data: () => ({
    validEbaySearch: false,
    keywords: ""
  }),
  methods: {
    searchEbay: debounce(function(event) {
      const { keywords } = this;
      if (event.type === "submit") {
        if (!keywords.length == 0) {
          this.$store.dispatch(`ebay/${SEARCH_EBAY}`, {
            keywords: [keywords]
          });
        }
      }
    }, 500)
  }
};
</script>

<style scoped></style>
