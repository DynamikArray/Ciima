<template>
  <div class="w-100">
    <AuditLogFilters
      :resourceType="resourceType"
      :actionType="actionType"
      :userId="userId"
      :getData="fetchAuditLogWithParams"
      :updateParam="updateLocalParam"
    />

    <v-divider class="my-1"></v-divider>

    <AuditLogPager
      key="topPager"
      align="end"
      :limit.sync="limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="fetchAuditLogWithParams"
    />

    <v-divider class="my-1"></v-divider>

    <AuditLogDatatable
      :headers="headers"
      :loading="loading"
      :items="items"
      :itemsPerPage="limit"
    />

    <v-divider class="my-1"></v-divider>

    <AuditLogPager
      key="bottomPager"
      align="end"
      :limit.sync="limit"
      :page="page"
      :pageCount="pageCount"
      :pageLimit="pageLimit"
      :rowsTotal="rowsTotal"
      :getData="fetchAuditLogWithParams"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { AUDIT_LOG_FETCH } from "@/store/action-types";

import rowHeaders from "./datatable/headers.js";
import AuditLogFilters from "./datatable/filters/AuditLogFilters";
import AuditLogPager from "@/components/Datatable/Pager/CustomPager";
import AuditLogDatatable from "./datatable/AuditLogDatatable";

export default {
  components: {
    AuditLogFilters,
    AuditLogPager,
    AuditLogDatatable
  },
  data: () => ({
    limit: 10,
    resourceType: "ALL",
    actionType: "ALL",
    userId: "ALL"
  }),
  computed: {
    ...mapState({
      loading: state => state.auditLog.loading,
      items: state => state.auditLog.items,
      page: state => state.auditLog.page,
      pageCount: state => state.auditLog.pageCount,
      pageLimit: state => state.auditLog.pageLimit,
      rowsTotal: state => state.auditLog.rowsTotal
    }),
    headers() {
      return rowHeaders;
    }
  },
  created() {
    this.fetchAuditLogWithParams();
  },
  methods: {
    updateLocalParam(params) {
      Object.keys(params).forEach(key => {
        if (this[key]) this[key] = params[key];
      });
    },
    fetchAuditLogWithParams(params = {}) {
      const _params = {
        //include all of our locals, overwrite passed in
        limit: this.limit,
        resourceType: this.resourceType,
        actionType: this.actionType,
        userId: this.userId,
        ...params
      };
      this.$store.dispatch(`auditLog/${AUDIT_LOG_FETCH}`, _params);
    }
  }
};
</script>

<style scoped></style>
