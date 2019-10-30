<template>
  <div class="ma-3">
    <v-form v-model="validSearch" @submit.prevent="searchInventory">
      <v-text-field
        autofocus
        hide-details
        persistent-hint
        v-model="searchString"
        label="Search for products that match"
        prepend-icon="fa-search"
      >
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  PRICE_SEARCH_STRING,
  PRICE_SEARCH_CLEAR
} from "@/store/mutation-types";

import { PRICE_SEARCH } from "@/store/action-types";

export default {
  data: () => ({
    validSearch: false
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType
    }),
    searchString: {
      get() {
        return this.$store.state.pricing.searchString;
      },
      set(value) {
        this.$store.commit(`pricing/${PRICE_SEARCH_STRING}`, value);
      }
    }
  },
  methods: {
    searchInventory() {
      const { searchString } = this;

      if (!searchString.length == 0) {
        this.$store.commit(`pricing/${PRICE_SEARCH_CLEAR}`);

        //always try to search ebay
        this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
          searchString,
          searchType: "ebayEnded"
        });

        //always try to search ebay
        this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
          searchString,
          searchType: "ebayActive"
        });

        if (this.defaultProductType === "singles") {
          this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
            searchString,
            searchType: "myComicShop"
          });
        }
      }
    }
  }
};
</script>

<style scoped></style>
