<template>
  <div class="pa-3">
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

    <div v-if="draftIssues">
      <v-list>
        <v-list-item
          class="my-2"
          v-for="issue in draftIssues"
          :key="issue.id"
          @click=""
        >
          <div class="d-flex flex-row w-100 justify-space-between">
            <div class="d-flex mr-3">
              <v-img :src="makeImageUrl(issue)" width="35"></v-img>
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
            <div class="d-flex ml-3  align-self-center ">
              <v-btn rounded icon color="warning" @click="removeDraft(issue)">
                <v-icon>fa-minus-circle</v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_ISSUE_REMOVE } from "@/store/mutation-types.js";

export default {
  computed: {
    ...mapState({
      selectedTitle: state => state.titleSearch.selected.item,
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
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
