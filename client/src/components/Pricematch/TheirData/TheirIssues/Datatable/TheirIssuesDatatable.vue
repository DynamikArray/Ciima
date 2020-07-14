<template>
  <div class="d-flex justify-center align-center flex-grow-1 mb-10">
    <v-data-table
      id="theirIssuesDataTable"
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="50"
      :footer-props="footerProps"
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          v-show="matchType == 'ISSUES'"
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
        <div v-if="item.prices.length > 0" class="mr-3">
          <v-tooltip left :max-width="420" color="info">
            <template v-slot:activator="{ on }">
              <v-btn icon label color="white" v-on="on" class="pa-2 textShadow">
                <v-icon class="">
                  fa fa-comment-dollar
                </v-icon>
              </v-btn>
            </template>
            <div v-if="item.prices" class="w-100 text-center">
              <h4>Current Prices:</h4>
              <v-divider class="my-1"></v-divider>
              <div
                class="d-flex align-center justify-space-between w-100"
                v-for="price in item.prices"
              >
                <div class="mr-4 ml-1">
                  {{ price.grade }}
                </div>
                <div class="ml-4 mr-1">
                  {{ price.price | currency }}
                </div>
              </div>
            </div>
          </v-tooltip>
        </div>
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
    previewImage: false,
    previewImageUrl: false,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100, 250]
    }
  }),
  computed: {
    headers() {
      if (this.matchType == "ISSUES") {
        const actions = {
          text: "Match",
          value: "action",
          sortable: false,
          align: "center",
          width: "60px"
        };
        return [actions, ...headers];
      }
      return headers;
    }
  },
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
