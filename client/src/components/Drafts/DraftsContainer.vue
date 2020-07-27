<template>
  <div class="DraftsContainer">
    <DraftsFilters
      align="end"
      :createdDate="filters.createdDate"
      :draftStatus="filters.draftStatus"
      :draftType="filters.draftType"
      :searchString="filters.searchString"
      :loading="loading"
      :getData="fetchDraftsWithParams"
    ></DraftsFilters>

    <v-divider class="my-1"></v-divider>

    <DraftsPager
      key="topPager"
      align="end"
      :limit="filters.limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="fetchDraftsWithParams"
    ></DraftsPager>

    <v-divider class="my-1"></v-divider>

    <DraftsTable
      :limit="filters.limit"
      :isMobile="isMobile"
      :headers="rowHeaders"
      :status="filters.draftStatus"
      :drafts="drafts"
      :loading="loading"
      :getData="fetchDraftsWithParams"
    ></DraftsTable>

    <v-divider class="my-1"></v-divider>

    <DraftsPager
      key="bottomPager"
      align="end"
      :limit="filters.limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="fetchDraftsWithParams"
    ></DraftsPager>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { OPEN_DRAFTS_FETCH } from "@/store/action-types";

import { headers } from "@/components/Drafts/Datatables/settings/config.js";

import DraftsTable from "@/components/Drafts/Datatables/DraftsTable";
import DraftsPager from "@/components/Drafts/Datatables/templates/DraftsPager";
import DraftsFilters from "@/components/Drafts/Datatables/templates/DraftFilters/DraftsFilters";

export default {
  props: {
    isMobile: [Boolean]
  },
  components: {
    DraftsTable,
    DraftsPager,
    DraftsFilters
  },
  data: () => ({
    filters: {
      draftStatus: "open",
      limit: 15,
      draftType: "",
      searchString: "",
      createdDate: ""
    },
    headers: headers,
    mobileHeaders: ["inventoryTitle"]
  }),
  created() {
    this.fetchDraftsWithParams();
  },
  computed: {
    ...mapState({
      loading: state => state.openDrafts.loading,
      drafts: state => state.openDrafts.items,
      page: state => state.openDrafts.page,
      pageCount: state => state.openDrafts.pageCount,
      pageLimit: state => state.openDrafts.pageLimit,
      rowsTotal: state => state.openDrafts.rowsTotal
    }),
    rowHeaders() {
      if (this.isMobile) {
        return this.headers.filter(col => {
          return this.mobileHeaders.some(selected => {
            if (selected == col.value) return true;
            return false;
          });
        });
      }
      return this.headers;
    }
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        this.filters[key] = params[key];
      });
    },
    fetchDraftsWithParams(params = {}) {
      this.updateLocalParam(params);
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, {
        ...this.filters,
        ...params
      });
    }
  }
};
</script>

<style scoped></style>
