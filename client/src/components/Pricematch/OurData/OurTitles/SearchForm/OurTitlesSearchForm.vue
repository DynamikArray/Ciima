<template>
  <div class="d-flex justify-center align-center w-100 mx-0">
    <v-form
      v-model="validTitleSearch"
      @submit.prevent="handleSearchInput"
      class="w-100 grey darken-4 textShadow px-4 pb-2"
    >
      <div class="d-flex justify-center align-center w-100">
        <div class="d-flex align-center justify-center w-100">
          <v-text-field
            autocomplete="off"
            autofocus
            hide-details
            persistent-hint
            v-model="searchTitleString"
            label="Search Our Titles"
            prepend-icon="fa-search"
            @input="handleSearchInput"
            class="py-3"
          />
        </div>
        <div class="d-flex align-center justify-center w-100">
          <v-text-field
            autocomplete="off"
            hide-details
            persistent-hint
            v-model="searchPublisherString"
            label="Search Our Publishers"
            prepend-icon="fa-search"
            @input="handlePublisherInput"
            class="py-3"
          />
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { SEARCH_OUR_TITLES } from "@/store/action-types.js";

export default {
  props: {},
  data: () => ({
    searchPublisherString: "",
    searchTitleString: "",
    validTitleSearch: false
  }),
  methods: {
    handleSearchInput: debounce(function(event) {
      //search value
      const search = this.searchTitleString;
      //on submit or debounce after 3 chars
      if (event.type === "submit" || search.length >= 2) {
        //when submit is prssed make sure its not empty
        if (!search.length == 0) {
          this.fetchTitlesByString(search);
        }
      }
    }, 500),
    handlePublisherInput: debounce(function(event) {
      //search value
      const search = this.searchPublisherString;
      //on submit or debounce after 3 chars
      if (event.type === "submit" || search.length >= 2) {
        //when submit is prssed make sure its not empty
        if (!search.length == 0) {
          this.fetchTitlesByPublisher(search);
        }
      }
    }, 500),
    fetchTitlesByString(search) {
      const publisher = this.searchPublisherString || "";
      this.$store.dispatch(`pricematch/ourData/${SEARCH_OUR_TITLES}`, {
        query: search,
        publisher
      });
    },
    fetchTitlesByPublisher(publisher) {
      const query = this.searchTitleString || "";
      this.$store.dispatch(`pricematch/ourData/${SEARCH_OUR_TITLES}`, {
        publisher,
        query
      });
    }
  }
};
</script>

<style scoped></style>
