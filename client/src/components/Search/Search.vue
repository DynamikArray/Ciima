<template>
  <section>
    <v-card raised outlined>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="searchString"
            label="Search Titles"
            prepend-icon="fa-search"
            debounce="250"
            v-on:keyup="handleSubmit"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
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
    handleSubmit() {
      const search = this.searchString;
      //greater than 3 so search
      if (search.length > 3) {
        this.$store.dispatch(`titleSearch/${SEARCH_TITLES}`, {
          q: this.searchString
        });
      }
      //clear our results set
      if (search.length == 0) {
        this.$store.commit(`titleSearch/${SEARCH_TITLES_RESULTS_CLEAR}`);
      }
    }
  }
};
</script>

<style scoped></style>
