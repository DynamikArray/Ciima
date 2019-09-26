<template>
  <section>
    <v-card raised outlined>
      <v-card-text class="">
        <v-form v-model="validTitleSearch" @submit.prevent="searchTitles">
          <v-text-field
            autofocus
            hide-details
            persistent-hint
            v-model="searchTitleString"
            label="Search Titles"
            prepend-icon="fa-search"
            @input="searchTitles"
          >
            <template v-slot:append-outer>
              <v-btn text class="" @click="toggleAdvancedSearch">
                <v-icon class="mr-1">{{ advancedIcon() }}</v-icon
                >Advanced
              </v-btn>
            </template>
          </v-text-field>
        </v-form>

        <v-form
          v-if="showAdvanced"
          v-model="validIssueSearch"
          @submit.prevent="searchIssues"
        >
          <v-text-field
            autofocus
            hide-details
            persistent-hint
            v-model="searchIssuesString"
            label="Storylines (Natural Language Mode)"
            prepend-icon="fa-search"
            v-on:keyup.enter="searchIssues"
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
    searchTitleString: "",
    validTitleSearch: false,

    searchIssuesString: "",
    validIssueSearch: false,
    showAdvanced: false
  }),
  methods: {
    searchTitles: debounce(function(event) {
      const search = this.searchTitleString;

      if (event.type === "submit" || search.length > 3) {
        if (!search.length == 0) {
          //greater than 3 so search
          this.$store.dispatch(`titleSearch/${SEARCH_TITLES}`, {
            query: search,
            advanced: 0
          });
        }
      }
    }, 500),
    //
    //
    searchIssues: debounce(function(event) {
      const search = this.searchIssuesString;

      if (event.type === "submit" || search.length > 3) {
        if (!search.length == 0) {
          //greater than 3 so search
          this.$store.dispatch(`titleSearch/${SEARCH_TITLES}`, {
            query: search,
            advanced: 1
          });
        }
      }
    }, 500),

    toggleAdvancedSearch() {
      this.showAdvanced = !this.showAdvanced;
    },
    advancedIcon() {
      if (this.showAdvanced) return "fa-arrow-alt-circle-up";
      return "fa-arrow-alt-circle-down";
    }
  }
};
</script>

<style scoped></style>
