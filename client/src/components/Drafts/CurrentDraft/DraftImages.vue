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
      <div class="d-flex align-center justify-center grow">
        <DraftsIssuesList></DraftsIssuesList>
      </div>
    </div>

    <v-divider class="my-2"></v-divider>

    <div class="d-flex w-100 justify-end mb-3">
      <div class="d-flex mx-3">
        <v-btn color="red" @click="resetDraft"
          ><v-icon class="mr-2">fa-undo-alt</v-icon>Clear Draft</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENT_DRAFT_CLEAR } from "@/store/mutation-types.js";

import CurrentImage from "@/components/Drafts/CurrentImage";
import DraftsIssuesList from "@/components/Drafts/DraftsIssuesList";
import DraftTitlesList from "@/components/Drafts/DraftTitlesList";

export default {
  components: {
    CurrentImage,
    DraftsIssuesList,
    DraftTitlesList
  },
  methods: {
    resetDraft() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
