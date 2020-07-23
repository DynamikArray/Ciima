<template>
  <div class="d-flex justify-center align-center w-100 mx-0">
    <v-form
      v-model="validTitleSearch"
      @submit.prevent="handleSearchInput"
      class="w-100 grey darken-4 textShadow px-4 pb-2"
    >
      <v-text-field
        autocomplete="off"
        hide-details
        persistent-hint
        v-model="searchTitleString"
        label="Search Their Titles"
        prepend-icon="fa-search"
      >
        <template v-slot:append-outer>
          <v-btn color="info" @click="handleSearchInput({ submit: true })"
            ><v-icon small class="mr-1">fa fa-search</v-icon>Search</v-btn
          >
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { SEARCH_THEIR_TITLES } from "@/store/action-types.js";

import { titleCleaner } from "@/util/pricing/titleCleaner";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object]
  },
  data: () => ({
    searchTitleString: "",
    validTitleSearch: false
  }),
  watch: {
    ourSelectedTitle: function(newVal, oldVal) {
      if (newVal.title) {
        this.searchTitleString = titleCleaner(newVal.title);
        this.handleSearchInput(false);
      }
    }
  },
  methods: {
    handleSearchInput: function(event) {
      //search value
      const search = this.searchTitleString;

      //on submit or debounce after 3 chars
      if (event.type === "submit") {
        //when submit is prssed make sure its not empty
        if (!search.length == 0) {
          this.fetchTitlesByString(search);
        }
      }

      //handle button submissions
      if (event.submit) {
        if (!search.length == 0) {
          this.fetchTitlesByString(search);
        }
      }
    },
    fetchTitlesByString(search) {
      this.$store.dispatch(`pricematch/theirData/${SEARCH_THEIR_TITLES}`, {
        query: search
      });
    }
  }
};
</script>

<style scoped></style>
