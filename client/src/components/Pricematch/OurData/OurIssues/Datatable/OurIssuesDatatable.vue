<template>
  <div class="w-100 mb-5">
    <v-data-table
      id="ourIssuesDataTable"
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
      :footer-props="footerProps"
    >
      <template v-slot:item="{ item }">
        <tr v-ripple @click="selectOurIssue(item)">
          <td>
            <span class="ml-3">{{ item.title }} {{ item.fullIssue }}</span>
          </td>
          <td class="text-center">{{ item.issueNumber }}</td>
          <td class="text-center">{{ item.variation }}</td>
          <td class="text-center">{{ item.comicType }}</td>
          <td class="text-center">{{ item.fullIssue }}</td>
          <td class="text-right">
            <IssueImage :item="item" :onClick="showFullSizeImage" />
          </td>
          <td class="">
            <v-btn
              class="textShadow pa-0"
              style="min-width:40px;"
              @click="selectOurIssue(item)"
              ><v-icon small>fa fa-plus-circle</v-icon></v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-dialog v-model="previewImage" max-width="500">
      <v-card color="black" dark class="pt-2">
        <v-card-text>
          <v-img :src="previewImageUrl" max-height="600" contain></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { SET_OUR_SELECTED_ISSUE } from "@/store/action-types";

import { headers } from "./Settings/headers.js";
import IssueImage from "./Templates/IssueImage";

export default {
  props: {
    matchType: [String],
    containerHeight: [Number],
    items: [Boolean, Array],
    loading: [Boolean]
  },
  components: {
    IssueImage
  },
  data: () => ({
    headers,
    previewImage: false,
    previewImageUrl: false,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100, 250]
    }
  }),
  methods: {
    showFullSizeImage(image) {
      this.previewImageUrl = image;
      this.previewImage = true;
    },
    selectOurIssue(item) {
      this.$store.dispatch(`pricematch/${SET_OUR_SELECTED_ISSUE}`, item, {
        global: true
      });
    }
  }
};
</script>

<style>
.HideOverflowY {
  overflow-y: hidden;
}

#ourIssuesDataTable table tr td {
  padding: 4px 8px;
}
</style>
