<template>
  <div class="d-flex w-100 flex-column align-self-strech flex-grow">
    <PriceListDatatable
      :limit="limit"
      :items="pricelistItems"
      :pagination="pricelistPager"
      :loading="pricelistLoading"
      :getData="fetchDataWithParams"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SEARCH_PRICELIST } from "@/store/action-types";
import PriceListDatatable from "./Datatable/PriceListDatatable";
export default {
  props: {},
  data: () => ({
    limit: 15
  }),
  computed: {
    ...mapGetters({
      pricelistItems: "pricelist/getItems",
      pricelistPager: "pricelist/getItemsPager",
      pricelistLoading: "pricelist/getLoading"
    })
  },
  mounted() {
    this.fetchDataWithParams();
  },
  components: {
    PriceListDatatable
  },
  methods: {
    fetchDataWithParams(params) {
      //set our page limit if it changes
      if (params.limit) this.limit = params.limit;
      //add our page limit to all request
      const _params = { limit: this.limit, ...params };

      this.$store.dispatch(`pricelist/${SEARCH_PRICELIST}`, _params, {
        root: true
      });
    }
  }
};
</script>

<style scoped></style>
