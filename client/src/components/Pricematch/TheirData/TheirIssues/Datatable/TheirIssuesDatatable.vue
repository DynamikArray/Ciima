<template>
  <div class="d-flex justify-center align-center flex-grow-1 mb-5">
    <v-data-table
      id="theirIssuesDataTable"
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
      :footer-props="footerProps"
      hide-default-footer
    >
      <template v-slot:footer="{}">
        <MCSPager
          name="footerPager"
          :pagination="pagination"
          class="secondary darken-1 ma-1"
        />
      </template>

      <template v-slot:item.action="{ item }">
        <v-btn
          class="textShadow pa-0"
          style="min-width:40px;"
          @click="selectTheirIssue(item)"
          ><v-icon small>fa fa-plus-circle</v-icon></v-btn
        >
      </template>

      <template v-slot:item.images="{ item }">
        <IssueImage :item="item" :onClick="showFullSizeImage" />
      </template>

      <template v-slot:item.title="{ item }">
        {{ item.title }} {{ item.issueNumber }}
      </template>

      <template v-slot:item.prices="{ item }">
        <Prices :item="item" />
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
import { SET_THEIR_SELECTED_ISSUE } from "@/store/action-types";

import { headers } from "./Settings/headers.js";
import IssueImage from "./Templates/IssueImage";
import MCSPager from "./Templates/MCSPager/MCSPager";
import Prices from "./Templates/Prices";

export default {
  props: {
    containerHeight: [Number],
    items: [Boolean, Array],
    pagination: [Boolean, Object],
    loading: [Boolean]
  },
  components: {
    IssueImage,
    MCSPager,
    Prices
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
    selectTheirIssue(item) {
      this.$store.dispatch(`pricematch/${SET_THEIR_SELECTED_ISSUE}`, item, {
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

#theirIssuesDataTable table tr td {
  padding: 4px 8px;
}
</style>
