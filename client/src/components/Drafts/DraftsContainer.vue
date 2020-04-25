<template>
  <v-row>
    <v-col class="py-0">
      <DraftsOptions
        :status.sync="status"
        :getData="fetchDraftsWithParams"
      ></DraftsOptions>

      <v-divider class="my-1"></v-divider>

      <DraftsPager
        key="topPager"
        align="end"
        :limit.sync="limit"
        :page="page"
        :pageCount="pageCount"
        :pageLimit="pageLimit"
        :rowsTotal="rowsTotal"
        :getData="fetchDraftsWithParams"
      ></DraftsPager>

      <v-divider class="my-1"></v-divider>

      <DraftsTable
        :limit="limit"
        :isMobile="isMobile"
        :headers="rowHeaders"
        :status="status"
        :drafts="drafts"
        :loading="loading"
        :getData="fetchDraftsWithParams"
      ></DraftsTable>

      <v-divider class="my-1"></v-divider>

      <DraftsPager
        key="bottomPager"
        align="end"
        :limit.sync="limit"
        :page="page"
        :pageCount="pageCount"
        :pageLimit="pageLimit"
        :rowsTotal="rowsTotal"
        :getData="fetchDraftsWithParams"
      ></DraftsPager>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { OPEN_DRAFTS_FETCH } from "@/store/action-types";

import { headers } from "@/components/Drafts/Datatables/settings/config.js";

import DraftsTable from "@/components/Drafts/Datatables/DraftsTable";
import DraftsOptions from "@/components/Drafts/Datatables/templates/DraftOptions/DraftOptions";
import DraftsPager from "@/components/Drafts/Datatables/templates/DraftsPager";

export default {
  props: {
    isMobile: [Boolean]
  },
  components: {
    DraftsTable,
    DraftsOptions,
    DraftsPager
  },
  data: () => ({
    showAllUsers: true,
    status: "open",
    limit: 15,
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
    fetchDraftsWithParams(params = {}) {
      //defaults,
      const _params = {
        all: +this.showAllUsers,
        status: this.status,
        limit: this.limit,
        ...params
      };

      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, _params);
    }
  }
};
</script>

<style scoped></style>
