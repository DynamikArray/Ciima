<template>
  <v-form v-model="validLinnworksSearch" @submit.prevent="searchLinnworks">
    <v-text-field
      autocomplete="off"
      ref="searchString"
      autofocus
      hide-details
      persistent-hint
      :value="searchString"
      label="Search Linnworks Inventory"
      prepend-icon="fa-search"
      @input="searchLinnworks"
    >
    </v-text-field>
  </v-form>
</template>

<script>
import debounce from "lodash.debounce";
import { SEARCH_INVENTORY } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    searchString: [String]
  },
  data() {
    return {
      validLinnworksSearch: false
    };
  },
  methods: {
    searchLinnworks: debounce(async function(event) {
      const searchString = this.$refs.searchString.lazyValue;
      if (event.type === "submit") {
        if (!searchString.length == 0) {
          this.$emit("update:searchString", searchString);

          //greater than 3 so search
          const { error, result } = await this.$store.dispatch(
            `linnworks/${SEARCH_INVENTORY}`,
            {
              searchString
            }
          );
          if (result) {
            this.$store.commit(
              `api/${UPDATE_API_STATUS}`,
              `Loaded Inventory Results`,
              { root: true }
            );
          }
          //results get set in apiHandler
          if (error && !result) {
            this.$store.commit(`api/${UPDATE_API_STATUS}`, error, {
              root: true
            });
            this.$toastr.e(error);
          }
        }
      }
    }, 500)
  }
};
</script>

<style scoped></style>
