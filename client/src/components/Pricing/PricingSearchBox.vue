<template>
  <div class="ma-3">
    <v-form v-model="validSearch" @submit.prevent="searchInventory">
      <div class="d-flex justify-space-between">
        <div class="d-flex align-center grow mx-2">
          <v-text-field
            autofocus
            hide-details
            persistent-hint
            v-model="searchString"
            label="Search for products that match"
            prepend-icon="fa-search"
          >
          </v-text-field>
        </div>
      </div>
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
      issues: state => state.currentDraft.issues,
      titles: state => state.currentDraft.titles,
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
  watch: {
    issues(val) {
      if (val.length > 0) this.buildTitleString();
    },
    titles(val) {
      if (val.length > 0) this.buildTitleString();
    }
  },
  methods: {
    buildTitleString() {
      let titleString = "";
      const { titles, issues } = this;
      if (titles.length) titleString = titles[0].title;
      if (issues.length) titleString = `${titleString} ${issues[0].fullIssue}`;
      this.searchString = titleString;
    },
    //
    //
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
