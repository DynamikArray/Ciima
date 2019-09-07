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
import { SEARCH_TITLES } from "@/store/action-types.js";

export default {
  data: () => ({
    valid: false,
    searchString: ""
  }),
  methods: {
    handleSubmit() {
      const search = this.searchString;
      if (search.length > 3) {
        this.$store.dispatch(`search/${SEARCH_TITLES}`, {
          q: this.searchString
        });
      }
    }
  }
};
</script>

<style scoped></style>
