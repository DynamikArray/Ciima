<template>
  <div class="d-flex w-100">
    <div class="d-flex align-center justify-center grow">
      <CurrentImage></CurrentImage>
    </div>
    <div class="d-flex align-center justify-center grow">
      <DraftsIssuesList></DraftsIssuesList>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_ISSUE_REMOVE } from "@/store/mutation-types.js";
import CurrentImage from "@/components/Drafts/CurrentImage";
import DraftsIssuesList from "@/components/Drafts/DraftsIssuesList";

export default {
  components: {
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
    removeDraft(item) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_REMOVE}`, item);
    }
  }
};

/*

<v-card color="info">
  <v-card-text>
    <p>
      Title: <b v-if="selectedTitle">{{ selectedTitle.title }}</b>
    </p>
    <p>
      Publisher: <b v-if="selectedTitle">{{ selectedTitle.publisher }}</b>
    </p>

    <div v-if="draft.items">
      <div v-for="item in draft.items">
        <p>
          {{ item.title }}
        </p>
      </div>
    </div>
  </v-card-text>
</v-card>

<v-divider class="my-3"></v-divider>

 */
</script>

<style scoped>
.coverPhoto {
  object-fit: contain;
  width: 50%;
}
</style>
