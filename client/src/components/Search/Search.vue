<template>
  <section>
    <v-card raised outlined>
      <v-card-text class="">
        <v-form v-model="valid" @submit.prevent="searchTitles">
          <v-text-field
            autofocus
            hide-details
            persistent-hint
            v-model="searchString"
            label="Search Titles"
            prepend-icon="fa-search"
            @input="searchTitles"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import debounce from "lodash.debounce";
import {
  SEARCH_TITLES,
  SEARCH_TITLES_RESULTS_CLEAR
} from "@/store/action-types.js";

export default {
  data: () => ({
    valid: false,
    searchString: ""
  }),
  methods: {
    searchTitles: debounce(function(event) {
      const search = this.searchString;

      if (event.type === "submit" || search.length > 3) {
        //greater than 3 so search
        this.$store.dispatch(`titleSearch/${SEARCH_TITLES}`, {
          q: this.searchString
        });
      }

      //clear results
      if (event.type === "submit" && search.length == 0) {
        this.$store.commit(`titleSearch/${SEARCH_TITLES_RESULTS_CLEAR}`);
      }
    }, 500)
  }
};
</script>

<style scoped></style>
