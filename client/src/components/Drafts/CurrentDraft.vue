<template>
  <div class="">
    <v-expand-transition>
      <div v-if="draftIssues.length">
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
              ><v-icon class="mr-2">fa-redo</v-icon>Reset</v-btn
            >
          </div>
        </div>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div v-if="!draftIssues.length" class="text-center">
        <v-card>
          <v-card-text class="text-center">
            <h1 class="display-1">No Issues Selected</h1>
          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_CLEAR } from "@/store/mutation-types.js";

import CurrentImage from "@/components/Drafts/CurrentImage";
import DraftsIssuesList from "@/components/Drafts/DraftsIssuesList";
import DraftTitlesList from "@/components/Drafts/DraftTitlesList";

export default {
  components: {
    DraftTitlesList,
    CurrentImage,
    DraftsIssuesList
  },
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      draftIssues: state => state.currentDraft.issues
    })
  },
  methods: {
    makeImageUrl(item) {
      //// TODO: place this url in a config file
      return `http://searchlightcomics.com/${item.imageUrl}`;
    },
    resetDraft() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped>
.coverPhoto {
  object-fit: contain;
  width: 50%;
}
</style>
