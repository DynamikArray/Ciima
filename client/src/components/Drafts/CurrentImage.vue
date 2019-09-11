<template>
  <div class="d-flex justify-center" v-if="draftIssues.length">
    <div v-if="!draft.coverPhoto" class="d-flex-column justify-center">
      <div class="d-flex justify-center">
        <v-btn success color="success" :to="'/images'">
          <v-icon class="mr-2">fa-image</v-icon>Create
        </v-btn>
      </div>
      <div class="d-flex justify-center small" style="width:240px">
        <h4 class="my-3 text-center">
          Create a product photo from the selected images
        </h4>
      </div>
    </div>

    <div v-if="draft.coverPhoto" class="d-flex justify-center mt-6">
      <div v-if="draft.coverPhoto" class="d-flex flex-column">
        <div class="d-flex justify-center my-3">
          <div v-if="draft.savingCover">
            <v-icon color="blue darken-1" x-large
              >fas fa-circle-notch fa-spin</v-icon
            >
          </div>
          <div v-if="!draft.savingCover">
            <v-img
              id="coverPhoto"
              :src="draft.coverPhoto"
              width="240"
              class="d-flex shrink"
            ></v-img>
          </div>
        </div>

        <div class="d-flex justify-center my-3">
          <div class="mx-4">
            <v-btn
              :disabled="draft.savingCover"
              v-if="draft.coverPhoto"
              success
              color="warning"
              :to="'/images'"
            >
              <v-icon class="mr-2">fa-image</v-icon>Edit
            </v-btn>
          </div>
          <div class="mx-4">
            <v-btn
              :disabled="draft.savingCover"
              v-if="draft.coverPhoto"
              success
              color="red"
              @click="deleteImagePhoto()"
            >
              <v-icon class="mr-2">fa-times-circle</v-icon>Delete
            </v-btn>
          </div>
        </div>

        <div class="d-flex grow justify-center">
          <v-btn color="primary" @click="downloadImages"
            ><v-icon class="mr-2">fa-download</v-icon>Download Images</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CURRENT_DRAFT_COVER_PHOTO_CLEAR } from "@/store/mutation-types.js";

export default {
  computed: {
    ...mapState({
      draft: state => state.currentDraft,
      draftIssues: state => state.currentDraft.issues
    })
  },
  methods: {
    deleteImagePhoto() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_COVER_PHOTO_CLEAR}`);
    }
  }
};
</script>

<style scoped></style>
