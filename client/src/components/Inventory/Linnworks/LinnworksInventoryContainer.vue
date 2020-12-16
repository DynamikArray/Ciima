<template>
  <div class="">
    <FiltersContainer
      :searchTitle.sync="filters.searchTitle"
      :searchLocation.sync="filters.searchLocation"
      :searchCategories.sync="filters.searchCategories"
      @runSearch="fetchData"
    />

    <v-divider class="my-2"></v-divider>
    <div class="d-flex align-start justify-end py-1">
      <h4>{{ items.length }} Results</h4>
    </div>

    <Datatable
      :items="items"
      :loading="loading"
      :isMobile="isMobile"
      @itemSelected="itemSelected"
    />

    <LinnworksItemContainer
      :selectedId="selectedId"
      :visible="visible"
      @closed="modalClosed"
    />
  </div>
</template>

<script>
//action types
import { mapGetters } from "vuex";
import { SEARCH_LINNWORKS_INVENTORY } from "@/store/action-types";

import FiltersContainer from "./Filters/FiltersContainer";
import Datatable from "./Datatable/Datatable";
import LinnworksItemContainer from "./Item/LinnworksItemContainer";

export default {
  props: {
    isMobile: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    FiltersContainer,
    Datatable,
    LinnworksItemContainer
  },
  data: () => ({
    filters: {
      searchTitle: "",
      searchLocation: "",
      searchCategories: []
    },
    visible: false,
    selectedId: false
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
    },
    itemSelected(pkStockItemID) {
      this.selectedId = pkStockItemID;
      this.visible = true;
    },
    modalClosed() {
      this.visible = false;
      this.selectedId = false;
    }
  }
};
</script>

<style scoped></style>
