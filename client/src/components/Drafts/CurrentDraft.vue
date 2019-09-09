<template>
  <div class="mt-2">
    <v-expand-transition>
      <div v-if="draftIssues.length">
        <div class="d-flex w-100 flex-row flex-wrap">
          <div class="d-flex align-center justify-center grow">
            <CurrentImage></CurrentImage>
          </div>
          <div class="d-flex align-center justify-center grow">
            <DraftsIssuesList></DraftsIssuesList>
          </div>
        </div>

        <v-divider class="my-3"></v-divider>

        <div class="d-flex w-100 justify-end mb-3">
          <div class="d-flex mx-3">
            <v-btn color="primary" @click=""
              ><v-icon class="mr-1">fa-save </v-icon>Save</v-btn
            >
          </div>
          <div class="d-flex mx-3">
            <v-btn color="red" @click="clearAllDraftIssues()"
              ><v-icon class="mr-1">fa-trash</v-icon>Delete</v-btn
            >
          </div>
        </div>
      </div>
    </v-expand-transition>

    <div v-if="!draftIssues.length" class="text-center">
      <v-card>
        <v-card-text class="text-center">
          <h1 class="display-1">No Issues Selected</h1>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
