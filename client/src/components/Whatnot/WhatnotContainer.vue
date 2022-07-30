<template>
  <div class="whatnot-containter">
    <div class="d-flex justify-space-between ">
      <div class="d-flex align-center justify-center flex-column">
        <div class="d-flex align-center justify-center">
          <h2>Search Whatnot Sales:</h2>
        </div>
        <div class="d-flex align-center justify-start">
          <p class="caption">Please note, results are limited to 1k records</p>
        </div>
      </div>
      <div class="d-flex align-center justify-center">
        <WhatnotFilters :saleDate="filters.saleDate" :buyer="filters.buyer" @update="fetchDraftsWithParams" class="mx-5" />
        <WhatnotUpload class="mx-5" @refresh="fetchDraftsWithParams" />
      </div>
    </div>

    <v-divider class="my-3"></v-divider>

    <WhatnotSalesDataGrid @buyerSelected="fetchDraftsWithParams" />
  </div>
</template>

<script>
import WhatnotFilters from "@/components/Whatnot/Filters/WhatnotFilters";
import WhatnotUpload from "@/components/Whatnot/Upload/WhatnotUpload";
import WhatnotSalesDataGrid from "@/components/Whatnot/Datatables/WhatnotSalesDataGrid";

import { WHATNOT_SEARCH_SALES } from "@/store/action-types";

export default {
  name: "WhatnotContainer",
  props: {},
  components: { WhatnotFilters, WhatnotUpload, WhatnotSalesDataGrid },
  data: () => ({
    filters: {
      buyer: "",
      saleDate: ""
    }
  }),
  created() {
    this.fetchDraftsWithParams();
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    fetchDraftsWithParams(params = {}) {
      this.updateLocalParam(params);
      this.$store.dispatch(`whatnot/${WHATNOT_SEARCH_SALES}`, {
        ...this.filters,
        ...params
      });
    }
  }
};
</script>

<style scoped></style>
