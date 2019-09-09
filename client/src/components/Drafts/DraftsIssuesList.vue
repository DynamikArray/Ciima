<template>
  <div v-if="draftIssues.length > 0" class="w-100 mr-2">
    <v-list dense>
      <v-list-item-title class="text-left">
        <div class="d-flex justify-space-around">
          <div class="d-flex grow justify-start">
            <h2>{{ draftIssues.length }} Issues</h2>
          </div>

          <div class="d-flex grow justify-end align-self-center mr-4">
            <b class="overline">Remove</b>
          </div>
        </div>
      </v-list-item-title>

      <v-scale-transition group leave-absolute>
        <v-list-item
          class="grey darken-2 mb-1"
          v-for="issue in draftIssues"
          :key="issue.id"
          @click=""
          transition="scale-transition"
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
      </v-scale-transition>
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
