<template>
  <div class="d-flex justify-center align-center w-100 grey darken-4">
    <div
      class="d-flex flex-grow titleBox"
      style="min-height:340px; max-height:340px;"
    >
      <OurIssue
        key="ourIssue"
        v-if="ourSelectedIssue"
        :selectedIssue="ourSelectedIssue"
        class="textShadow"
      />
      <div
        class="d-flex align-center justify-center w-100"
        key="noOurIssue"
        v-else
      >
        <v-scroll-x-transition mode="out-in">
          <h2 class="d-flex warning darken-1 pa-4 textShadow">
            No (Our) Selected Issue
          </h2>
        </v-scroll-x-transition>
      </div>
    </div>

    <div class="d-flex align-self-stretch px-2">
      <div class="d-flex flex-row">
        <div
          class="d-flex flex-column align-center align-self-stretch justify-space-between py-1 px-2 borderLeft borderRight borderBotttom secondary lighten"
        >
          <div class="d-flex justify-space-between align-start w-100">
            <div class="d-flex ">
              <v-btn
                @click="clearOurSelectedIssue"
                color="red"
                xSmall
                style="min-width:26px"
                class="pa-0"
                v-if="ourSelectedIssue"
                ><v-icon small>fa fa-times</v-icon></v-btn
              >
            </div>
            <div class="d-flex">
              <v-btn
                @click="clearTheirSelectedIssue"
                color="red"
                xSmall
                style="min-width:26px"
                class="pa-0"
                v-if="theirSelectedIssue"
                ><v-icon small>fa fa-times</v-icon></v-btn
              >
            </div>
          </div>

          <div class="d-flex flex-wrap align-center justify-center">
            <h1 class="text-center textShadow" style="line-height: 1.1em;">
              Price Matcher
            </h1>
          </div>

          <div
            class="d-flex justify-space-between align-center align-self-stretch textShadow"
          >
            <div class="d-flex align-start justify-start">
              <h3 class="d-flex flex-column">
                Ours<v-icon class="">fa fa-hand-point-left</v-icon>
              </h3>
            </div>
            <div class="d-flex align-end justify-end">
              <h3 class="d-flex flex-column">
                Theirs
                <v-icon class="">fa fa-hand-point-right</v-icon>
              </h3>
            </div>
          </div>

          <div class="mx-3 my-10">
            <ActionButtons
              :ourSelectedIssue="ourSelectedIssue"
              :theirSelectedIssue="theirSelectedIssue"
              :theirSelectedTitle="theirSelectedTitle"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="d-flex flex-grow titleBox"
      style="min-height:340px; max-height:340px;"
    >
      <TheirIssue
        v-if="theirSelectedIssue"
        :selectedIssue="theirSelectedIssue"
        class="textShadow"
      />
      <div class="d-flex align-center justify-center w-100" v-else>
        <v-scroll-x-transition mode="in-out">
          <h2
            class="d-flex warning darken-1 pa-4 textShadow"
            key="NoTheriSelectedIssue"
          >
            No (Their) Selected Issue
          </h2>
        </v-scroll-x-transition>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CLEAR_OUR_SELECTED_ISSUE,
  CLEAR_THEIR_SELECTED_ISSUE
} from "@/store/action-types";
import { mapGetters } from "vuex";

import OurIssue from "./OurIssue/OurIssue";
import TheirIssue from "./TheirIssue/TheirIssue";
import ActionButtons from "./Templates/ActionButtons";

export default {
  components: {
    OurIssue,
    TheirIssue,
    ActionButtons
  },
  computed: {
    ...mapGetters({
      ourSelectedIssue: "pricematch/ourData/getOurSelectedIssue",
      theirSelectedIssue: "pricematch/theirData/getTheirSelectedIssue",
      theirSelectedTitle: "pricematch/theirData/getTheirSelectedTitle"
    })
  },
  methods: {
    clearOurSelectedIssue() {
      this.$store.dispatch(
        `pricematch/ourData/${CLEAR_OUR_SELECTED_ISSUE}`,
        {},
        { root: true }
      );
    },
    clearTheirSelectedIssue() {
      this.$store.dispatch(
        `pricematch/theirData/${CLEAR_THEIR_SELECTED_ISSUE}`,
        {},
        { root: true }
      );
    }
  }
};
</script>

<style scoped>
.titleBox {
  flex-basis: 50%;
  max-width: 50%;
}
</style>
