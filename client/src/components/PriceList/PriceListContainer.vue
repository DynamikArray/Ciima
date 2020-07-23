<template>
  <div class="d-flex w-100 flex-column align-self-strech flex-grow">
    <PriceListDatatable
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
      this.$store.dispatch(`pricelist/${SEARCH_PRICELIST}`, params, {
        root: true
      });
    }
  }
};
</script>

<style scoped></style>
