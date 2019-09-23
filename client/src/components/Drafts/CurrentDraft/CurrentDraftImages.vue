<template>
  <div class="currentDraftImagesWrapper ma-3">
    <v-slide-y-transition group>
      <v-card
        v-if="!draftIssues.length"
        elevation="10"
        outlined
        class="grey darken-4"
        key="noDrafts"
      >
        <GetStarted></GetStarted>
      </v-card>
      <v-card
        v-else
        elevation="10"
        outlined
        class="grey darken-4"
        key="draftIssues"
      >
        <DraftImages :switchToTab="switchToTab"></DraftImages>
      </v-card>
    </v-slide-y-transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

import DraftImages from "./DraftImages";
import GetStarted from "./GetStarted";

export default {
  props: {
    switchToTab: [Function]
  },
  components: {
    DraftImages,
    GetStarted
  },
  computed: {
    ...mapState({
      draftIssues: state => state.currentDraft.issues
    })
  },
  methods: {}
};
</script>

<style scoped></style>
