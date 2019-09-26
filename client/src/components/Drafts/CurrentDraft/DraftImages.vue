<template>
  <div>
    <div class="d-flex align-center flex-row justify-center grow">
      <DraftTitlesList></DraftTitlesList>
    </div>
    <v-divider class="my-2"></v-divider>

    <div class="d-flex w-100 flex-row flex-wrap">
      <div class="d-flex align-center justify-center grow">
        <CurrentImage></CurrentImage>
      </div>
      <div
        class="d-flex align-center justify-center px-3"
        style="min-width:0px"
      >
        <DraftsIssuesList></DraftsIssuesList>
      </div>
    </div>

    <v-divider class="my-2"></v-divider>

    <div class="d-flex justify-space-between w-100 pa-3">
      <div class="d-flex">
        <v-btn color="red" @click="resetDraft"
          ><v-icon class="mr-2">fa-undo-alt</v-icon>Clear Draft</v-btn
        >
      </div>
      <div v-if="coverPhoto" class="d-flex">
        <v-btn color="success" to="draft"
          ><v-icon class="mr-2">fa-arrow-circle-right</v-icon>Continue
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// TODO: add confirmation are you sure you want to clear the draft
//
import { CURRENT_DRAFT_CLEAR } from "@/store/mutation-types.js";

import CurrentImage from "@/components/Drafts/CurrentImage";
import DraftsIssuesList from "@/components/Drafts/DraftsIssuesList";
import DraftTitlesList from "@/components/Drafts/DraftTitlesList";

export default {
  computed: {
    ...mapState({
      coverPhoto: state => state.currentDraft.coverPhoto
    })
  },
  props: {
    currentImage: [String],
    switchToTab: [Function]
  },
  components: {
    CurrentImage,
    DraftsIssuesList,
    DraftTitlesList
  },
  methods: {
    continueDraft() {
      this.switchToTab(1);
    },
    resetDraft() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
