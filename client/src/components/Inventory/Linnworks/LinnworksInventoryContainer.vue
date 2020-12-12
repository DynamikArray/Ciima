<template>
  <div class="">
    <Filters
      :searchTitle.sync="filters.searchTitle"
      :searchLocation.sync="filters.searchLocation"
      :searchCategories.sync="filters.searchCategories"
      @runSearch="fetchData"
    />

    <v-divider class="my-2"></v-divider>
    <div class="d-flex align-start justify-end py-1">
      <h4>{{ items.length }} Results</h4>
    </div>

    <Datatable :items="items" :loading="loading" :isMobile="isMobile" />
  </div>
</template>

<script>
//action types
import { mapGetters } from "vuex";
import { SEARCH_LINNWORKS_INVENTORY } from "@/store/action-types";

import Filters from "./Filters/Filters";
import Datatable from "./Datatable/Datatable";

export default {
  props: {
    isMobile: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    Filters,
    Datatable
  },
  data: () => ({
    filters: {
      searchTitle: "",
      searchLocation: "",
      searchCategories: []
    }
  }),
  computed: {
    ...mapGetters({
      items: "linnworks/inventory/getItems",
      loading: "linnworks/inventory/getLoading"
    })
  },
  methods: {
    fetchData() {
      const { filters } = this;
      if (
        (filters.searchTitle && filters.searchTitle.length > 2) ||
        (filters.searchLocation && filters.searchLocation.length > 2)
      ) {
        this.$store.dispatch(
          `linnworks/inventory/${SEARCH_LINNWORKS_INVENTORY}`,
          filters
        );
      }
    }
  }
};
</script>

<style scoped></style>
