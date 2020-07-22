<template>
  <div class="d-flex justify-center align-center w-100 grey darken-4 pa-1">
    <div
      class="d-flex flex-grow titleBox"
      style="min-height:300px; max-height:300px;"
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
          class="d-flex flex-column align-center align-self-stretch justify-space-around py-1"
        >
          <div class="d-flex justify-space-between align-start w-100">
            <div class="d-flex align-start justify-start w-100">
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
            <div class="d-flex align-self-stretch ml-1 mt-1">
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

          <!--<IssueMatcherModal class="" />-->

          <div class="mx-3 mt-4">
            <v-btn color="success" class=""
              ><v-icon small class="mr-3">fa fa-save</v-icon>Save Match</v-btn
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="d-flex flex-grow titleBox"
      style="min-height:300px; max-height:300px;"
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

//import IssueMatcherModal from "../IssueMatcherModal/IssueMatcherModal";
import OurIssue from "./OurIssue/OurIssue";
import TheirIssue from "./TheirIssue/TheirIssue";

export default {
  components: {
    //IssueMatcherModal,
    OurIssue,
    TheirIssue
  },
  computed: {
    ...mapGetters({
      ourSelectedIssue: "pricematch/getOurSelectedIssue",
      theirSelectedIssue: "pricematch/getTheirSelectedIssue"
    })
  },
  methods: {
    clearOurSelectedIssue() {
      this.$store.dispatch(
        `pricematch/${CLEAR_OUR_SELECTED_ISSUE}`,
        {},
        { global: true }
      );
    },
    clearTheirSelectedIssue() {
      this.$store.dispatch(
        `pricematch/${CLEAR_THEIR_SELECTED_ISSUE}`,
        {},
        { global: true }
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
