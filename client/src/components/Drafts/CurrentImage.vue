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

    <div v-if="draft.coverPhoto" class="d-flex justify-center mt-1">
      <div v-if="draft.coverPhoto" class="d-flex flex-column">
        <div class="d-flex justify-center my-1">
          <div v-if="draft.savingCover">
            <v-icon color="blue darken-1" x-large
              >fas fa-circle-notch fa-spin</v-icon
            >
          </div>
          <div v-if="!draft.savingCover">
            <v-img
              id="coverPhoto"
              :src="optimizedImageUrl"
              width="140"
              class="d-flex shrink"
            ></v-img>
          </div>
        </div>

        <div class="d-flex justify-center my-1">
          <div class="mx-4">
            <v-btn
              x-small
              :disabled="draft.savingCover"
              v-if="draft.coverPhoto"
              success
              color="red"
              @click="deleteImagePhoto()"
            >
              <v-icon x-small class="mr-2">fa-times-circle</v-icon>Delete
            </v-btn>
          </div>
          <div class="mx-4">
            <v-btn
              x-small
              :disabled="draft.savingCover"
              v-if="draft.coverPhoto"
              success
              color="warning"
              :to="'/images'"
            >
              <v-icon x-small class="mr-2">fa-image</v-icon>Edit
            </v-btn>
          </div>

          <div class="mx-4">
            <v-btn x-small color="primary" @click="downloadImages"
              ><v-icon x-small class="mr-2">fa-download</v-icon>Download</v-btn
            >
          </div>
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
    }),
    optimizedImageUrl() {
      const basePath = "https://res.cloudinary.com/ciima/image/upload";
      const productPath = "productPhotos";

      const fullUrl = this.draft.coverPhoto;
      const fileNameArray = fullUrl.split(`/${productPath}/`);
      const fileName = fileNameArray[1];

      const src = `${basePath}/f_auto/${productPath}/${fileName}`;
      return src;
    }
  },
  methods: {
    //
    deleteImagePhoto() {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_COVER_PHOTO_CLEAR}`);
    },
    //
    //
    downloadImages() {
      const { issues } = this.draft;
      //Issue Photos
      issues.forEach(issue => {
        const filename =
          issue.title.replace(/\W/g, "") +
          "-" +
          issue.fullIssue.replace(/\W/g, "") +
          ".jpg";

        const cleanUrl = `http://searchlightcomics.com${encodeURIComponent(
          issue.imageUrl
        )}`;
        const url = `/v1/imageFetch?url=${cleanUrl}`;

        this.downloadImageLink(url, filename);
      });

      if (this.draft.coverPhoto) {
        //CoverPhoto
        const coverUrl = `/v1/imageFetch?url=${this.draft.coverPhoto}`;
        const coverPhoto =
          issues[0].title.replace(/\W/g, "") + "cover_photo.jpg";
        this.downloadImageLink(coverUrl, coverPhoto);
      }
    },
    //
    //
    downloadImageLink(url, filename) {
      var link = document.createElement("a");
      // TODO: place in a config or common file
      link.href = url;
      link.target = "_blank";
      link.download = filename;
      link.click();
    }
  }
};
</script>

<style scoped></style>
