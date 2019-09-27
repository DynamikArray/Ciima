<template>
  <div v-if="draftIssues.length > 0" class="w-100 mx-3 grey darken-3">
    <v-list dense class="py-0">
      <v-list-item-title class="text-left mx-4">
        <div class="d-flex justify-space-between">
          <div class="d-flex grow justify-start">
            <h2>
              {{ draftIssues.length }}
              <span class="subtitle-1 mx-3">Issues</span>
            </h2>
          </div>

          <div class="d-flex grow justify-end align-self-center mr-0">
            <b class="overline">Remove</b>
          </div>
        </div>
      </v-list-item-title>

      <draggable v-model="draftIssues">
        <v-scale-transition group leave-absolute>
          <div
            class="grey darken-2 mb-1 d-flex flex-row w-100 px-3 justify-space-end"
            v-for="issue in draftIssues"
            :key="issue.id"
            @click=""
          >
            <div class="d-flex mr-1">
              <v-img :src="makeImageUrl(issue)" width="25"></v-img>
            </div>

            <div class="d-flex align-center justify-center mx-3">
              <h4>{{ issue.fullIssue }}</h4>
            </div>

            <div
              class="d-flex flex-wrap align-center mr-auto"
              style="min-width:0px;"
            >
              <h4 class=" text-truncate">{{ issue.title }}</h4>
            </div>

            <div class="d-flex align-center ml-3">
              <v-btn small text color="red" @click="removeDraftIssue(issue)">
                <v-icon small>fa-times-circle</v-icon>
              </v-btn>
            </div>
          </div>
        </v-scale-transition>
      </draggable>
    </v-list>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_ISSUES_REORDER,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_CLEAR
} from "@/store/mutation-types.js";

import settings from "@/util/settings.js";

export default {
  components: {
    draggable
  },
  computed: {
    ...mapState({
      draft: state => state.currentDraft
      //draftIssues: state => state.currentDraft.issues
    }),
    draftIssues: {
      get() {
        return this.$store.state.currentDraft.issues;
      },
      set(issues) {
        this.$store.commit(
          `currentDraft/${CURRENT_DRAFT_ISSUES_REORDER}`,
          issues
        );
      }
    }
  },

  methods: {
    makeImageUrl(item) {
      //// TODO: place this url in a config file
      return `${settings.MEDIA_URL}${item.imageUrl}`;
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
