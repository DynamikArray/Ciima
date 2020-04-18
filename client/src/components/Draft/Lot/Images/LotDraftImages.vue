<template>
  <v-row>
    <v-col class="py-0 grey darken-4 mx-3">
      <div class="my-1" v-if="images.length == 0">
        <h4><em>No Images Selected</em></h4>
      </div>

      <div class="my-1" v-if="images.length > 0">
        <h5>Listing Images</h5>
      </div>

      <draggable
        v-model="images"
        @start="drag = true"
        @end="drag = false"
        class="d-flex justify-center align-center my-0 flex-wrap mx-2"
      >
        <div
          v-for="(image, index) in images"
          :key="image.name + Date.now()"
          class="d-flex align-center mx-4 my-3 pa-2 grey darken-3"
        >
          <div class="d-flex flex-column align-center">
            <img
              :src="image.src"
              height="90"
              max-width="140"
              contain
              :key="image.name + Date.now()"
            />
            <div class="d-flex align-center justify-space-around w-100 mt-1">
              <div class="">
                <v-btn xSmall @click="deleteImage(index)" color="red"
                  ><v-icon xSmall class="">fa fa-trash</v-icon></v-btn
                >
              </div>
              <div class="overline mx-1">
                {{ index === 0 ? `Main (${index})` : `Other(${index})` }}
              </div>
              <div class="">
                <v-btn xSmall @click="editImage(index)" color="info"
                  ><v-icon xSmall class="">fa fa-edit</v-icon></v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import {
  UPDATE_LOT_DRAFT_IMAGES,
  SET_IMAGE_TO_CROP
} from "@/store/mutation-types";

import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  computed: {
    imageToCrop: {
      get() {
        return this.$store.state.lots.draft.imageToCrop;
      },
      set(value) {
        this.$store.commit(`lots/draft/${SET_IMAGE_TO_CROP}`, value);
      }
    },
    images: {
      get() {
        return this.$store.state.lots.draft.images;
      },
      set(value) {
        this.$store.commit(`lots/draft/${UPDATE_LOT_DRAFT_IMAGES}`, value);
      }
    }
  },

  methods: {
    deleteImage(index) {
      const newImages = this.images;
      newImages.splice(index, 1);
      this.images = newImages;
    },
    editImage(index) {
      this.imageToCrop = index;
    }
  }
};
</script>
