<template>
  <section>
    <v-card raised outlined>
      <v-card-text class="">
        <v-form v-model="validTitleSearch" @submit.prevent="handleSearchInput">
          <v-text-field
            autocomplete="off"
            autofocus
            hide-details
            persistent-hint
            v-model="searchTitleString"
            label="Search Titles"
            prepend-icon="fa-search"
            @input="handleSearchInput"
          />

          <!--
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

              <v-btn text class="" @click="toggleUpcSearch">
                <v-icon class="mr-1">{{ upcIcon() }}</v-icon
                >UPC
              </v-btn>
            </template>
          </v-text-field>
        -->
        </v-form>

        <!--
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
        -->

        <!--
        <v-form
          v-if="showUpc"
          v-model="validUpcSearch"
          @submit.prevent="searchUpc"
        >
          <v-text-field
            autofocus
            hide-details
            persistent-hint
            v-model="searchUpcString"
            label="UPC"
            prepend-icon="fa-search"
            v-on:keyup.enter="searchUpc"
          ></v-text-field>
        </v-form>
        -->
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import debounce from "lodash.debounce";
import {
  SEARCH_TITLES,
  SEARCH_TITLES_RESULTS_CLEAR,
  SEARCH_UPC
} from "@/store/action-types.js";

export default {
  data: () => ({
    //searchUpcString: "",
    //validUpcSearch: false,

    searchTitleString: "",
    validTitleSearch: false

    //searchIssuesString: "",
    //validIssueSearch: false,

    //showAdvanced: false,
    //showUpc: false
  }),
  methods: {
    handleSearchInput: debounce(function(event) {
      //search value
      const search = this.searchTitleString;
      //on submit or debounce after 3 chars
      if (event.type === "submit" || search.length > 3) {
        //when submit is prssed make sure its not empty
        if (!search.length == 0) {
          if (!Number.isNaN(Number(search))) {
            //is numeric should be upc
            if (search.length == 17) {
              this.fetchTitlesByUpc(search);
            } else {
              this.$toastr.e(
                `<b>Invalid UPC detected:</b><br /><b>${search}</b><br/>
                Not enough characters, try rescanning.`
              );
              this.searchTitleString = "";
            }
          } else {
            this.fetchTitlesByString(search);
          }
        }
      }
    }, 500),
    fetchTitlesByString(search) {
      this.$store.dispatch(`titleSearch/${SEARCH_TITLES}`, {
        query: search
      });
    },
    fetchTitlesByUpc(search) {
      this.$store
        .dispatch(`titleSearch/${SEARCH_UPC}`, {
          query: search,
          upc: 1
        })
        .then(res => {
          this.$router.push({ name: "issues" });
        });
    }

    /*
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
    */
    //
    //
    /*
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
    */
    /*
    searchUpc: debounce(function(event) {
      const search = this.searchUpcString;

      if (event.type === "submit" || search.length > 3) {
        if (!search.length == 0) {
          //greater than 3 so search
          this.$store
            .dispatch(`titleSearch/${SEARCH_UPC}`, {
              query: search,
              upc: 1
            })
            .then(res => {
              this.$router.push({ name: "issues" });
            });
        }
      }
    }, 500),
    */
    /*
    toggleAdvancedSearch() {
      this.showAdvanced = !this.showAdvanced;
    },
    advancedIcon() {
      if (this.showAdvanced) return "fa-arrow-alt-circle-up";
      return "fa-arrow-alt-circle-down";
    },

    toggleUpcSearch() {
      this.showUpc = !this.showUpc;
    },
    upcIcon() {
      if (this.showUpc) return "fa-arrow-alt-circle-up";
      return "fa-arrow-alt-circle-down";
    }
    */
  }
};
</script>

<style scoped></style>
