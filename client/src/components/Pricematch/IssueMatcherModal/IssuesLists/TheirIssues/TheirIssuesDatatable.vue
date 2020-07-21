<template>
  <div class="w-100 pr-3">
    <v-data-table
      id="theirIssuesDataTable"
      class="w-100"
      :headers="headers"
      :items="issuesData"
      :loading="loading"
      loading-text="Searching database"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr :id="`theirIssues-${item._dataIndex}`" :class="isRowSelected(item)">
          <td class="text-center" width="30px">
            <v-btn
              small
              class="textShadow pa-0"
              style="min-width:30px;"
              @click="selectTheirIssue(item)"
              ><v-icon small>fa fa-plus-circle</v-icon></v-btn
            >
          </td>
          <td class="text-center " width="40px">
            <TheirImage :images="item.images" />
          </td>
          <td class="text-left" width="50px">
            {{ item.issueNumber }}
          </td>
          <td class="text-left">
            {{ item.title }}
          </td>
          <td class="text-right" width="60px">
            <Prices :item="item" />
          </td>
        </tr>
      </template>

      <template v-slot:footer="{}">
        <MCSPager
          name="footerPager"
          :pagination="theirIssuesPagination"
          class="secondary darken-1 ma-1"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { SET_THEIR_SELECTED_ISSUE } from "@/store/action-types";

import { headers } from "./Settings/tableHeaders";
import TheirImage from "./TheirImage";
import MCSPager from "@/components/Pricematch/TheirData/TheirIssues/Datatable/Templates/MCSPager/MCSPager";
import Prices from "@/components/Pricematch/TheirData/TheirIssues/Datatable/Templates/Prices";

export default {
  props: {
    theirIssues: [Boolean, Array, Object],
    theirIssuesPagination: [Boolean, Object],
    theirSelectedIssueIndex: [Boolean, Number]
  },
  data: () => ({
    headers,
    loading: false
  }),
  components: {
    TheirImage,
    Prices,
    MCSPager
  },
  computed: {
    issuesData() {
      return this.theirIssues.issues;
    },
    pagerData() {
      return this.theirIssues.pagination.pager;
    }
  },
  methods: {
    isRowSelected(item) {
      if (this.theirSelectedIssueIndex == item._dataIndex)
        return "secondary lighten-2";
    },
    selectTheirIssue(item) {
      this.$store.dispatch(`pricematch/${SET_THEIR_SELECTED_ISSUE}`, item, {
        global: true
      });
    }
  }
};
</script>

<style scoped></style>
