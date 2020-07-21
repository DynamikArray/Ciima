<template>
  <div
    class="d-flex flex-row justify-space-between align-center borderBottom pa-3"
  >
    <v-slide-y-reverse-transition mode="out-in">
      <div :key="`${title.title}-${title.issueCount}`" class="w-100">
        <div
          class="d-flex flex-row justify-space-between align-center align-self-stretch w-100 px-2 py-1 textShadow"
          :class="selectedTitle ? `grey darken-4` : ``"
        >
          <h4 class="d-flex flex-grow-1 justify-start align-center mx-2">
            {{ title.title ? title.title : "No title selected" }}
          </h4>
          <h5 class="d-flex justify-start align-center text-center mx-2">
            {{ title.issueCount ? `${title.issueCount} Issues` : `` }}
          </h5>
          <h5
            class="d-flex flex-wrap justify-center align-center text-center mx-2"
          >
            {{ title.publisher }}
          </h5>
          <h5 class="d-flex flex-wrap justify-center align-center mx-2">
            {{ title.years }}
          </h5>
          <v-btn
            v-if="selectedTitle"
            color="red"
            xSmall
            class="ml-5 textShadow pa-0"
            style="min-width:30px"
            @click="clearSelectedTitle()"
          >
            <v-icon small>fa fa-times-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
import {
  CLEAR_OUR_SELECTED_TITLE,
  CLEAR_THEIR_SELECTED_TITLE
} from "@/store/action-types";

export default {
  props: {
    blnOurs: {
      type: [Boolean],
      default: false
    },
    blnTheirs: {
      type: [Boolean],
      default: false
    },
    selectedTitle: [Boolean, Object]
  },
  components: {},
  computed: {
    title() {
      if (this.blnOurs) return this.ourTitle;
      if (this.blnTheirs) return this.theirTitle;
    },
    ourTitle() {
      const title = this.selectedTitle;
      return {
        title: title.title,
        publisher: title.publisher,
        years: title.yearsPublished,
        issueCount: title.issueCount
      };
    },
    theirTitle() {
      const title = this.selectedTitle;
      return {
        title: title.title,
        publisher: title.publisher,
        years: title.year,
        issueCount: title.issue
      };
    }
  },
  methods: {
    clearSelectedTitle() {
      if (this.blnOurs)
        this.$store.dispatch(`pricematch/${CLEAR_OUR_SELECTED_TITLE}`, {});
      if (this.blnTheirs)
        this.$store.dispatch(`pricematch/${CLEAR_THEIR_SELECTED_TITLE}`, {});
    }
  }
};
</script>

<style scoped></style>
