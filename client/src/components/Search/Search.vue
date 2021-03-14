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
          >
            <template v-slot:append-outer>
              <div class="d-flex flex-column grey darken-4 outlined pa-2" style="margin-top:-20px; border-radius:6px">
                <div class="d-flex">
                  <v-checkbox
                    v-model="treatNumbersAsText"
                    key="blnNumberAsText"
                    label="As Text"
                    class="ma-0 py-0 px-1"
                    dense
                    hide-details
                    color="primary"
                  >
                    <template v-slot:label>
                      <div class=" text-center body-1 text-wrap" style="max-width:250px; line-height:1.2em;">
                        Treat Numbers Like Text, NOT UPC.
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </div>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import debounce from "lodash.debounce";
import { SEARCH_TITLES, SEARCH_TITLES_RESULTS_CLEAR, SEARCH_UPC } from "@/store/action-types.js";

export default {
  data: () => ({
    searchTitleString: "",
    validTitleSearch: false,
    treatNumbersAsText: false
  }),
  methods: {
    handleSearchInput: debounce(function(event) {
      //search value
      const search = this.searchTitleString;
      //on submit or debounce after 3 chars
      if (event.type === "submit" || search.length > 3) {
        //when submit is prssed make sure its not empty
        if (!search.length == 0) {
          if (!Number.isNaN(Number(search)) && this.treatNumbersAsText == false) {
            //is numeric should be upc
            if (search.length == 17) {
              this.fetchTitlesByUpc(search);
            } else {
              this.$toastr.w(
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
  }
};
</script>

<style scoped></style>
