<template>
  <div class="w-100">
    <Filters :searchString.sync="filters.searchString" @runSearch="fetchData" />

    <v-divider class="my-2"></v-divider>

    <Datatable :items="items" :loading="loading" />
  </div>
</template>

<script>
//action types
import { mapGetters } from "vuex";
import { SEARCH_LINNWORKS_INVENTORY } from "@/store/action-types";

import Filters from "./Filters/Filters";
import Datatable from "./Datatable/Datatable";

export default {
  components: {
    Filters,
    Datatable
  },
  data: () => ({
    filters: {
      searchString: "",
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
      this.$store.dispatch(
        `linnworks/inventory/${SEARCH_LINNWORKS_INVENTORY}`,
        filters
      );
    }
  }
};
</script>

<style scoped></style>
