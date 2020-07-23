<template>
  <div class="w-100">
    <v-data-table
      id="theirIssuesDataTable"
      class="w-100"
      :headers="headers"
      :items="ourIssues"
      :loading="loading"
      loading-text="Searching database"
      :items-per-page="100"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr :id="`ourIssues-${item._dataIndex}`" :class="isRowSelected(item)">
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.issueNumber }}
          </td>
          <td>{{ item.variation }}</td>
          <td>{{ item.comicType }}</td>
          <td>{{ item.fullIssue }}</td>
          <td><IssueImage :item="item" /></td>
          <td>
            <v-btn
              small
              class="textShadow pa-0"
              style="min-width:30px;"
              @click="selectOurIssue(item)"
              ><v-icon small>fa fa-plus-circle</v-icon></v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { SET_OUR_SELECTED_ISSUE } from "@/store/action-types";

import { headers } from "./Settings/tableHeaders";
import IssueImage from "./IssueImage";

export default {
  props: {
    ourIssues: [Boolean, Array],
    ourSelectedIssueIndex: [Boolean, Number]
  },
  components: {
    IssueImage
  },
  data: () => ({
    headers,
    loading: false
  }),
  methods: {
    isRowSelected(item) {
      if (this.ourSelectedIssueIndex == item._dataIndex)
        return "secondary lighten-2";
    },
    selectOurIssue(item) {
      this.$store.dispatch(
        `pricematch/ourData/${SET_OUR_SELECTED_ISSUE}`,
        item,
        {
          global: true
        }
      );
    }
  }
};
</script>

<style scoped></style>
