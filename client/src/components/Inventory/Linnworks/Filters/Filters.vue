<template>
  <v-row class="grey darken-4 mx-0">
    <v-col cols="12">
      <SearchString
        :value="searchString"
        label="Search Linnworks"
        @updateSearchString="updateSearchString"
      />
      <div class="d-flex align-start justify-space-between pt-1">
        <SearchCategories
          :value="searchCategories"
          label="Linnworks Categories"
          @updateSearchCategories="updateSearchCategories"
        />
        <div class="mt-2">
          <v-btn class="primary"
            ><v-icon small class="mr-2">fa fa-search</v-icon>Search</v-btn
          >
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import SearchString from "./SearchString";
import SearchCategories from "./SearchCategories";

export default {
  name: "LinnworksInventoryFilters",
  props: {
    searchString: {
      type: [String]
    },
    searchCategories: {
      type: [Array]
    }
  },
  components: {
    SearchString,
    SearchCategories
  },
  methods: {
    updateSearchString(searchString) {
      this.$emit("update:searchString", searchString);
      this.$emit("runSearch");
    },
    updateSearchCategories(searchCategories) {
      //
      //updateSearchCategories
      //
    }
  }
};
</script>

<style scoped></style>
