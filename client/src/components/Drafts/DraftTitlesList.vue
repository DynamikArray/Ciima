<template>
  <div class="w-100">
    <div v-if="draftTitles.length" class="w-100">
      <div class="d-flex justify-space-between blue titlesHeader">
        <div class="d-flex flex grow align-center ml-2">
          <h2>
            {{ draftTitles.length }}<span class="subtitle-1 mx-1">Titles</span>
          </h2>
        </div>
        <div class="d-flex align-center mr-4">
          <h3 class="overline">Publisher</h3>
        </div>
        <div class="d-flex align-center mr-4">
          <h5 class="overline">Remove</h5>
        </div>
      </div>

      <v-divider class="mb-1"></v-divider>

      <draggable v-model="draftTitles" class="draftTitlesHover">
        <v-scroll-y-transition group>
          <div
            v-for="title in draftTitles"
            :key="title.titleId"
            class="d-flex flex-row w-100 pr-3 justify-space-end "
            style="overflowX"
          >
            <div class="d-flex justify-center align-center" style="width:20px;">
              <v-icon x-small>fa-ellipsis-v</v-icon>
            </div>
            <div
              class="d-flex flex-wrap align-center mr-auto"
              style="min-width:0px;"
            >
              <h4 class=" text-truncate">{{ title.title }}</h4>
            </div>
            <div class="d-flex align-center justify-center">
              <h4 class="text-center">{{ title.publisher }}</h4>
            </div>
            <div class="d-flex align-center ml-3">
              <v-btn small text color="red" @click="removeDraftTitle(title)">
                <v-icon small>fa-times-circle</v-icon>
              </v-btn>
            </div>
          </div>
        </v-scroll-y-transition>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";

import {
  CURRENT_DRAFT_TITLES_REORDER,
  CURRENT_DRAFT_TITLE_REMOVE
} from "@/store/mutation-types.js";

export default {
  components: {
    draggable
  },
  computed: {
    draftTitles: {
      get() {
        return this.$store.state.currentDraft.titles;
      },
      set(titles) {
        this.$store.commit(
          `currentDraft/${CURRENT_DRAFT_TITLES_REORDER}`,
          titles
        );
      }
    }
  },
  methods: {
    removeDraftTitle(title) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_TITLE_REMOVE}`, title);
    }
  }
};
</script>

<style scoped>
.titlesHeader {
  border-radius: 4px 4px 0 0;
}

.draftTitlesHover:hover {
  cursor: grab;
}
</style>
