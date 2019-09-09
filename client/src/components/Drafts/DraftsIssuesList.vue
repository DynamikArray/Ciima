<template>
  <div v-if="draftIssues.length > 0" class="w-100 mr-2">
    <v-list dense>
      <v-list-item-title class="text-left">
        <h2>
          Issue Count:<span class="title ml-1">{{ draftIssues.length }}</span>
        </h2>
      </v-list-item-title>
      <v-list-item
        class="grey darken-2 mb-1"
        v-for="issue in draftIssues"
        :key="issue.id"
        @click=""
      >
        <div class="d-flex flex-row w-100 justify-space-between">
          <div class="d-flex mr-3">
            <v-img :src="makeImageUrl(issue)" width="25"></v-img>
          </div>

          <div class="d-flex grow justify-start  align-self-center ">
            <div
              class="d-flex mr-3 justify-center"
              :style="{ minWidth: '70px' }"
            >
              <h4>{{ issue.fullIssue }}</h4>
            </div>
            <div class="d-flex">
              <h4>{{ issue.title }}</h4>
            </div>
          </div>

          <div class="d-flex align-self-center ">
            <div>
              <v-btn small color="red" @click="removeDraftIssue(issue)">
                <v-icon small>fa-times-circle</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-list-item>
      <v-list-item-title class="text-right pt-1">
        <v-btn color="red" @click="clearDraft()"
          ><v-icon class="mr-1">fa-trash</v-icon>All</v-btn
        >
      </v-list-item-title>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_CLEAR
} from "@/store/mutation-types.js";

export default {
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
    removeDraftIssue(item) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_REMOVE}`, item);
    },
    clearAllDraftIssues() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
