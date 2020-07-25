<template>
  <div class="d-flex w-100 flex-column align-self-strech flex-grow">
    <div class="d-flex flex-wrap align-end justify-space-between">
      <PriceListFilters :getData="fetchDataWithParams" />

      <CustomPager
        key="topPager"
        align="end"
        :limit="filters.limit"
        :page="pagerPage"
        :pageCount="pageCount"
        :pageLimit="pageLimit"
        :rowsTotal="rowsTotal"
        :getData="fetchDataWithParams"
      />
    </div>

    <PriceListDatatable
      :limit="filters.limit"
      :items="pricelistItems"
      :loading="pricelistLoading"
      :getData="fetchDataWithParams"
    />

    <CustomPager
      key="bottomPager"
      :limit="filters.limit"
      :page="pagerPage"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="fetchDataWithParams"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_PRICELIST } from "@/store/action-types";

import PriceListFilters from "./Datatable/DataFilters/PriceListFilters";
import CustomPager from "@/components/Datatable/Pager/CustomPager";
import PriceListDatatable from "./Datatable/PriceListDatatable";

export default {
  props: {},

  components: {
    PriceListFilters,
    PriceListDatatable,
    CustomPager
  },
  data: () => ({
    filters: {
      limit: 15,
      page: 1,
      createdDate: new Date().toISOString().substr(0, 10)
    }
  }),
  computed: {
    ...mapGetters({
      pricelistItems: "pricelist/getItems",
      pricelistPager: "pricelist/getItemsPager",
      pricelistLoading: "pricelist/getLoading"
    }),
    pagerPage() {
      return this.pricelistPager.page;
    },
    pageCount() {
      return this.pricelistPager.pageCount;
    },
    pageLimit() {
      return this.pricelistPager.pageLimit;
    },
    rowsTotal() {
      return this.pricelistPager.rowsTotal;
    }
  },
  mounted() {
    this.fetchDataWithParams();
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    fetchDataWithParams(params) {
      if (params) this.updateLocalParam(params);
      const _params = { ...this.filters, ...params };
      this.$store.dispatch(`pricelist/${SEARCH_PRICELIST}`, _params, {
        root: true
      });
    }
  }
};
</script>

<style scoped></style>
