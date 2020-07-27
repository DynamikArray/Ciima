<template>
  <div
    id="theirIssuesWrapper"
    class="d-flex align-center justify-start w-100 pt-1 textShadow"
    style="min-height:55px;"
  >
    <vuescroll :ops="ops" class="" id="">
      <div class="HideOverflowX mb-0 d-flex px-2">
        <div
          v-for="page in pager"
          class="d-flex flex-row mx-1 align-center justify-center pa-1"
        >
          <v-btn
            small
            class="px-1 grey darken-3"
            elevation="3"
            @click="gotoTheirIssuesResultPage(page.params)"
            style="min-width:32px;"
          >
            {{ formatButtonText(page.text) }}
          </v-btn>
        </div>

        <div
          class="d-flex align-center justify-end w-100"
          v-if="pager.length == 0"
        >
          <h4 class="pb-1 pr-3 my-2">No more pages</h4>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
//import { scrollbarSettings } from "@/util/scrollbarSettings";

import { GET_THEIR_ISSUES_PAGE } from "@/store/action-types";
export default {
  props: {
    pagination: [Boolean, Object]
  },
  components: {
    vuescroll
  },
  data: () => ({
    ops: {
      mode: "slide",
      detectReszie: true,
      scrollPanel: {
        scrollingX: true,
        scrollingY: false
      },
      rail: {
        size: "12px",
        background: "#333",
        specifyBorderRadius: "4px",
        border: "1px solid #595959",
        opacity: "1",
        gutterOfSide: "0px",
        keepShow: false
      },
      bar: {
        onlyShowBarOnScroll: false,
        size: "8px",
        background: "#2196f3",
        border: "1px solid #efefef",
        specifyBorderRadius: "5px",
        opacity: "1",
        keepShow: true
      }
    }
  }),
  computed: {
    pager() {
      if (!this.pagination) return false;
      return this.pagination.pager || false;
    }
  },
  methods: {
    formatButtonText(text) {
      if (text === "Previous") return `Prev`;
      if (text === "Next") return `Next`;
      return text;
    },
    gotoTheirIssuesResultPage(params) {
      this.$store.dispatch(
        `pricematch/theirData/${GET_THEIR_ISSUES_PAGE}`,
        params
      );
    }
  }
};
</script>

<style>
#theirIssuesWrapper .__rail-is-vertical {
  display: none;
}

.HideOverflowX {
  overflow-x: hidden;
}
</style>
