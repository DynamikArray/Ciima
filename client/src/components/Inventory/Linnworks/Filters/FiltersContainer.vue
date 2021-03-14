<template>
  <section>
    <v-row class="grey darken-4 mx-0">
      <v-col cols="8" class="pb-0">
        <SearchTitle
          :value="searchTitle"
          label="Search Item Titles"
          @updateSearchTitle="updateSearchTitle"
          @runSearch="runSearch"
        />
      </v-col>
      <v-col cols="4" class="pb-0">
        <!--
        <SearchLocation
          :value="searchLocation"
          label="Find Items in Bin/Rack"
          @updateSearchLocation="updateSearchLocation"
          @runSearch="runSearch"
        />
          -->
      </v-col>
    </v-row>
    <v-row class="grey darken-4 mx-0 my-0">
      <v-col cols="12" class="pt-0">
        <div class="d-flex align-start justify-space-between pt-1 flex-wrap">
          <!--
          <SearchCategories
            :value="searchCategories"
            label="Linnworks Categories"
            @updateSearchCategories="updateSearchCategories"
          />
            -->
          <div class="mt-2">
            <v-btn class="primary" @click="runSearch"><v-icon small class="mr-2">fa fa-search</v-icon>Search</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import SearchTitle from "./SearchTitle";
import SearchCategories from "./SearchCategories";
import SearchLocation from "./SearchLocation";

export default {
  name: "LinnworksInventoryFilters",
  props: {
    searchTitle: {
      type: [String]
    },
    searchLocation: {
      type: [String]
    },
    searchCategories: {
      type: [Array]
    }
  },
  components: {
    SearchTitle,
    SearchLocation,
    SearchCategories
  },
  methods: {
    updateSearchTitle(searchTitle) {
      this.$emit("update:searchTitle", searchTitle);
    },
    updateSearchLocation(searchLocation) {
      this.$emit("update:searchLocation", searchLocation);
    },
    updateSearchCategories(searchCategories) {
      this.$emit("update:searchCategories", searchCategories);
    },
    runSearch() {
      this.$emit("runSearch");
    }
  }
};
</script>

<style scoped></style>
