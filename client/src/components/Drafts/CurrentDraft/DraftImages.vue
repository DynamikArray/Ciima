<template>
  <div>
    <div class="d-flex align-center flex-row justify-center grow">
      <DraftTitlesList></DraftTitlesList>
    </div>
    <div class="d-flex justify-center">
      <p class="caption font-italic font-weight-thin my-0">
        Drag titles to reorder them as needed
      </p>
    </div>
    <v-divider class="my-2"></v-divider>

    <div class="d-flex w-100 flex-row flex-wrap">
      <div class="d-flex align-center justify-center grow my-3">
        <CurrentImage></CurrentImage>
      </div>
      <div
        class="d-flex align-center justify-center w-100"
        style="min-width:0px"
      >
        <DraftsIssuesList></DraftsIssuesList>
      </div>
    </div>
    <div class="d-flex align-center justify-center">
      <div class="text-center font-italic caption font-weight-thin my-0">
        Drag Issues to reorder them as needed.
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
    async resetDraft() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Reset the current draft?</h3>
        <p>This will clear all form fields and remove all Photos, Titles and Issues</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
