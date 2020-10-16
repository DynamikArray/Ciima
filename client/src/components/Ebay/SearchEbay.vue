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
import { PRICE_SEARCH_CLEAR } from "@/store/mutation-types";
import { PRICE_SEARCH } from "@/store/action-types";

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
          this.$store.commit(`pricing/${PRICE_SEARCH_CLEAR}`);

          /*
          THIS CALL WE MAKE WAS DEPRECATED WE NEED TO SCRAPE NOW
          this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
            searchString keywords,
            searchType: "ebayEnded"
          });
          */

          this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
            searchString: keywords,
            searchType: "ebayActive"
          });
        }
      }
    }, 500)
  }
};
</script>

<style scoped></style>
