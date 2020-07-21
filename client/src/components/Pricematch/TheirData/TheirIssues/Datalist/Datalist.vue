<template>
  <vuescroll
    :ops="ops"
    class=""
    id="theirIssuesScroller"
    ref="theirIssuesScroller"
  >
    <div
      class="w-100 ma-1 pa-1"
      v-for="item in items"
      :id="`theirIssues_${item._dataIndex}`"
      :class="isRowSelected(item)"
    >
      <div class="d-flex justify-start align-center w-100">
        <div class="px-1">
          <v-btn
            class="textShadow pa-0"
            style="min-width:40px;"
            @click="selectTheirIssue(item)"
            ><v-icon small>fa fa-plus-circle</v-icon></v-btn
          >
        </div>
        <div class="px-2" style="min-width:30px">
          <IssueImage :item="item" :onClick="showFullSizeImage" />
        </div>
        <div class="px-2 text-left" style="min-width:80px">
          {{ item.issueNumber }}
        </div>
        <div class="px-2 text-left mr-auto">
          {{ item.title }}
        </div>
        <div class="px-2 mr-4">
          <Prices :item="item" />
        </div>
      </div>
    </div>
    <div class="d-flex align-center justify-center my-4">
      <h5 class="caption">End of page</h5>
    </div>
    <v-dialog v-model="previewImage" max-width="500">
      <v-card color="secondary darken-3" dark class="pt-2">
        <v-card-text>
          <v-img :src="previewImageUrl" max-height="600" contain></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </vuescroll>
</template>

<script>
import { SET_THEIR_SELECTED_ISSUE } from "@/store/action-types";

import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import IssueImage from "@/components/Pricematch/TheirData/TheirIssues/Templates/IssueImage";
import Prices from "@/components/Pricematch/TheirData/TheirIssues/Templates/Prices";

export default {
  props: {
    theirSelectedIssueIndex: [Boolean, Number],
    items: [Boolean, Array],
    loading: [Boolean]
  },
  components: {
    vuescroll,
    IssueImage,
    Prices
  },
  watch: {
    theirSelectedIssueIndex: function(val) {
      if (val) {
        let position = val;
        if (position - 1 > 0) position = position - 1;

        this.$refs["theirIssuesScroller"].scrollIntoView(
          `#theirIssues_${position}`,
          250
        );
      }
    }
  },
  data: () => ({
    ops: scrollbarSettings,
    previewImageUrl: false,
    previewImage: false
  }),
  methods: {
    isRowSelected(item) {
      if (item._dataIndex == this.theirSelectedIssueIndex) {
        return "secondary lighten-2";
      }
      return "grey darken-3";
    },
    selectTheirIssue(item) {
      this.$store.dispatch(`pricematch/${SET_THEIR_SELECTED_ISSUE}`, item, {
        global: true
      });
    },
    showFullSizeImage(image) {
      this.previewImageUrl = image;
      this.previewImage = true;
    }
  }
};
</script>

<style scoped></style>
