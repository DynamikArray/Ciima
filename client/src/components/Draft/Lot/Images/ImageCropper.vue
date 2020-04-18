<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" class="py-0">
      <div class="grey darken-4 px-3 py-2">
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <h4 class="mb-1 text-left">Upload Image</h4>
          </div>
          <div class="d-flex align-center">
            <input
              ref="input"
              type="file"
              name="image"
              accept="image/*"
              multiple
              @change="setImages"
            />
          </div>

          <v-btn
            @click="clearImgSrc"
            v-show="imageSelected"
            small
            color="red"
            class="mx-2 mb-1"
          >
            <v-icon small class="mr-1">fa-trash</v-icon>Cancel
          </v-btn>

          <v-btn
            v-show="!imageSelected"
            small
            color="info"
            @click.prevent="showFileChooser"
            class="mx-2"
          >
            <v-icon small class="mr-1">fa-image</v-icon>Choose Image
          </v-btn>
        </div>

        <div v-if="imageSelected" class="w-100">
          <vue-cropper
            ref="cropper"
            :src="imageToCropFromIndex"
            preview=".preview"
            :autoCropArea="1"
          />
          <div class="d-flex justify-center align-center flex-wrap my-2">
            <v-btn small color="info" @click.prevent="reset" class="mx-1 my-2">
              <v-icon small class="mr-1">fa-reply</v-icon>Reset
            </v-btn>

            <v-btn
              color="blue"
              small
              @click.prevent="rotate(90)"
              class="mx-1 my-2"
            >
              <v-icon small class="mr-1">fa-undo</v-icon>Rotate
            </v-btn>
            <v-btn
              color="blue"
              small
              @click.prevent="rotate(-90)"
              class="mx-1 my-2"
            >
              <v-icon small class="mr-1">fa-redo</v-icon>Rotate
            </v-btn>
            <v-btn
              color="success"
              small
              @click.prevent="cropImage"
              class="mx-1 my-2"
            >
              <v-icon small class="mr-1">fa-crop</v-icon>Save
            </v-btn>
          </div>
          <v-divider></v-divider>
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="4" class="py-0" v-if="imageSelected">
      <div class="grey darken-4 px-3 py-2">
        <h4 class="mb-1 text-center">Preview Selected Image</h4>
        <section class=" text-center " v-if="cropImg">
          <div class="cropped-image">
            <v-img
              :key="lastCropped"
              contain
              :src="cropImg"
              alt="Cropped Image"
              class="img img-thumbnail"
            />
          </div>
          <div class="overline my-1">
            Image is smaller than it may appear on Ebay Listing Page
          </div>
          <div class="d-flex justify-space-around align-center flex-wrap my-3">
            <v-btn
              color="success"
              @click.prevent="saveCroppedImage"
              class="mx-2 my-3"
            >
              <v-icon small class="mr-2">fa-save</v-icon>Use Image
            </v-btn>
          </div>
        </section>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import {
  UPDATE_LOT_DRAFT_IMAGES,
  SET_IMAGE_TO_CROP
} from "@/store/mutation-types";

export default {
  props: {
    imageToCrop: [Boolean, Number]
  },
  components: {
    VueCropper
  },
  data() {
    return {
      cropImg: "",
      lastCropped: Date.now()
    };
  },
  computed: {
    imageSelected() {
      if (this.imageToCrop === false) return false;
      return true;
    },
    imageToCropFromIndex() {
      return this.images[this.imageToCrop].src;
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
    clearImgSrc() {
      this.$store.commit(`lots/draft/${SET_IMAGE_TO_CROP}`, false);
      this.cropImg = false;
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper
        .getCroppedCanvas()
        .toDataURL("image/jpeg");

      this.lastCropped = Date.now();
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    setImages(e) {
      const files = [...e.target.files];

      files.forEach((file, index) => {
        if (file.type.indexOf("image/") === -1) {
          alert("Please select an image file");
          return;
        }
        if (typeof FileReader === "function") {
          const reader = new FileReader();
          reader.onload = event => {
            this.images = [
              ...this.images,
              { name: file.name, src: event.target.result }
            ];
          };
          reader.readAsDataURL(file);
        } else {
          alert("Sorry, FileReader API not supported");
        }
      });
    },
    saveCroppedImage() {
      const image = this.cropImg;
      this.images[this.imageToCrop].src = image;
      this.clearImgSrc();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
  display: none;
}
</style>
