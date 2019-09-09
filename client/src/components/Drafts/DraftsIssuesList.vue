<template>
  <div v-if="draftIssues.length > 0" class="w-100">
    <v-list>
      <v-list-item
        class="mb-1 mx-1 pa-1 grey darken-2"
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
          <div class="d-flex ml-3  align-self-center ">
            <v-btn rounded icon color="danger" @click="removeDraft(issue)">
              <v-icon>fa-minus-circle</v-icon>
            </v-btn>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    }
  }
};
</script>

<style scoped></style>
