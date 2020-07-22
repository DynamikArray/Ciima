<template>
  <vuescroll :ops="ops" class="" id="ourIssuesScroller" ref="ourIssuesScroller">
    <div
      class="w-100 ma-1 px-1 borderBottom"
      v-for="item in items"
      :id="`ourIssues_${item._dataIndex}`"
      :class="isRowSelected(item)"
    >
      <div class="d-flex justify-start align-center w-100">
        <div class="px-2 text-left mr-auto">
          {{ item.title }} #{{ item.fullIssue }}
        </div>
        <div class="body-2 px-2 text-right" style="min-width:40px">
          {{ item.coverDate | date }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          {{ item.variation }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          {{ item.comicType }}
        </div>
        <div class="px-2 text-right" style="min-width:80px">
          {{ item.fullIssue }}
        </div>
        <div class="px-2" style="min-width:30px">
          <IssueImage :item="item" :onClick="showFullSizeImage" />
        </div>
        <div class="px-2 mr-4">
          <v-btn
            class="textShadow pa-0"
            style="min-width:40px;"
            @click="selectOurIssue(item)"
            ><v-icon small>fa fa-plus-circle</v-icon></v-btn
          >
        </div>
      </div>
    </div>

    <CustomPager
      name="ourHheaderPager"
      :pagination="ourIssuesPagination"
      :ourSelectedTitle="ourSelectedTitle"
      class="mb-10"
    />

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
import { SET_OUR_SELECTED_ISSUE } from "@/store/action-types";
import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import IssueImage from "@/components/Pricematch/OurData/OurIssues/Templates/IssueImage";
import CustomPager from "@/components/Pricematch/OurData/OurIssues/Templates/CustomPager";

export default {
  props: {
    ourSelectedTitle: [Boolean, Object],
    ourIssuesPagination: [Boolean, Object],
    ourSelectedIssueIndex: [Boolean, Number],
    items: [Boolean, Array],
    loading: [Boolean]
  },
  components: {
    vuescroll,
    IssueImage,
    CustomPager
  },
  data: () => ({
    ops: scrollbarSettings,
    previewImageUrl: false,
    previewImage: false
  }),
  watch: {
    ourIssuesPagination: function(newVal, oldVal) {
      if (newVal.page !== oldVal.page) {
        this.$refs["ourIssuesScroller"].scrollIntoView(`#ourIssues_0`, 250);
      }
    },
    items: function(items) {
      if (items[0]) {
        this.$store.dispatch(`pricematch/${SET_OUR_SELECTED_ISSUE}`, items[0], {
          global: true
        });
      }
    },
    ourSelectedIssueIndex: function(val) {
      if (val) {
        let position = val;
        if (position - 1 > 0) position = position - 1;

        this.$refs["ourIssuesScroller"].scrollIntoView(
          `#ourIssues_${position}`,
          250
        );
      }
    }
  },
  methods: {
    isRowSelected(item) {
      if (item._dataIndex == this.ourSelectedIssueIndex) {
        return "secondary lighten-2";
      }
      return "grey darken-3";
    },
    selectOurIssue(item) {
      this.$store.dispatch(`pricematch/${SET_OUR_SELECTED_ISSUE}`, item, {
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
