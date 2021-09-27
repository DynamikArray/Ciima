<template>
  <div class="DatatableUserTargets">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      sort-by="BelowThreshold"
      sort-desc
      ref="UserTargetsDataTable"
      @update:page="$vuetify.goTo($refs.UserTargetsDataTable)"
    >
      <template v-slot:item.startDate="{ item }">
        <div class="caption">{{ convertDate(item.startDate) }} - {{ convertDate(item.endDate) }}</div>
      </template>

      <template v-slot:item.userName="{ item }">
        <h3>{{ item.userName }}</h3>
      </template>

      <template v-slot:item.targetValue="{ item }">
        <h2>{{ item.targetValue | currency }}</h2>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex">
          <ButtonEditUserTarget :item="item" class="mr-2" />
          <ButtonDeleteUserTarget :item="item" class="ml-2" @success="rowDeleted" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { format } from "date-fns";
import { dashboard as config } from "@/config";
import { UserTargetHeaders } from "./_headers";
import ButtonEditUserTarget from "./ButtonEditUserTarget";
import ButtonDeleteUserTarget from "./ButtonDeleteUserTarget";

export default {
  name: "DatatableUserTargets",
  props: {
    items: {
      type: [Array],
      default: () => []
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    ButtonEditUserTarget,
    ButtonDeleteUserTarget
  },
  data: () => ({
    headers: UserTargetHeaders
  }),
  methods: {
    refreshGrid() {
      this.$emit("refresh");
    },
    convertDate(dateVal) {
      return format(dateVal, config.formatDatePlain, { weekStartsOn: 1 });
    },
    rowDeleted() {
      this.refreshGrid();
    }
  }
};
</script>

<style scoped>
.DatatableUserTargets .dtSlotTop .v-data-footer {
  border-top: 0px !important;
}
</style>
