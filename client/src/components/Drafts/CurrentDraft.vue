<template>
  <div class="">
    <div v-if="draftIssues.length > 0">
      <v-list>
        <v-list-item
          class="my-2 grey darken-1 ma-2 pa-2"
          v-for="issue in draftIssues"
          :key="issue.id"
          @click=""
        >
          <div class="d-flex flex-row w-100 justify-space-between">
            <div class="d-flex mr-3">
              <v-img :src="makeImageUrl(issue)" width="20"></v-img>
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
      <v-divider></v-divider>
      <div class="pa-2 text-center">
        <v-btn color="success" class="ml-4">
          <v-icon class="mr-2">fa-image</v-icon> Create Image
        </v-btn>
        <p class="caption mt-1">
          Use the selected products to create a Main Product photo for these
          stock item listing.
        </p>
      </div>
    </div>
    <div v-else class="ma-3 text-center">
      <h2 class="mt-8">
        No Issues currently included in this item.
      </h2>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_ISSUE_REMOVE } from "@/store/mutation-types.js";

export default {
  components: {},

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
.w-100 {
  width: 100%;
}
</style>
