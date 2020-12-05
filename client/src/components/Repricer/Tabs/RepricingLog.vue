<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <!--
    <div class="d-flex align-end justify-start">
      <h3>Search Filters:</h3>
    </div>
    <div class="w-100">
      <v-divider class="my-1" />
    </div>
    -->

    <div class="d-flex flex-column align-end justify-start w-100">
      <LogPager
        key="topPager"
        align="end"
        :limit.sync="filters.limit"
        :page="page"
        :pageCount="pageCount"
        :pageLimit="pageLimit"
        :rowsTotal="rowsTotal"
        :getData="fetchLogWithParams"
      ></LogPager>

      <Datatable :items="items" :loading="loading" :pageLimit="filters.limit" />

      <LogPager
        key="bottomPager"
        align="end"
        :limit.sync="filters.limit"
        :page="page"
        :pageCount="pageCount"
        :pageLimit="pageLimit"
        :rowsTotal="rowsTotal"
        :getData="fetchLogWithParams"
      ></LogPager>
    </div>
  </div>
</template>

<script>
import LogPager from "@/components/Datatable/Pager/CustomPager";
import Datatable from "../Datatable/RepricingLogDT";

export default {
  name: "RepricingLog",
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    },
    pager: {
      type: [Object]
    },
    getData: {
      type: [Function]
    }
  },
  components: {
    LogPager,
    Datatable
  },
  data: () => ({
    filters: {
      limit: 10,
      page: 1
    }
  }),
  computed: {
    page() {
      if (this.pager && this.pager.page) {
        return this.pager.page || 0;
      }
      return 0;
    },
    pageCount() {
      if (this.pager && this.pager.count) {
        return this.pager.count || 0;
      }
      return 0;
    },
    pageLimit() {
      if (this.pager && this.pager.limit) {
        return this.pager.limit || 0;
      }
      return 0;
    },
    rowsTotal() {
      if (this.pager && this.pager.total) {
        return this.pager.total || 0;
      }
      return 0;
    }
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    fetchLogWithParams(params = {}) {
      this.updateLocalParam(params);
      if (params.limit) this.updateLocalParam({ page: 1 });

      this.getData({
        ...this.filters,
        ...params
      });
    }
  }
};
</script>

<style scoped></style>
