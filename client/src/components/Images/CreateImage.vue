<template>
  <div class="text-center">
    <div
      v-if="issues.length"
      class="d-flex align-center w-100 justify-space-around mb-2"
    >
      <div class="mr-3 grow">
        <v-select
          solo
          hide-details
          :items="rowOpts"
          :value="gridRows"
          label="Number of Rows"
          @change="handleOnChangeRows($event)"
        ></v-select>
      </div>
      <div class="ml-3 grow">
        <v-select
          solo
          hide-details
          :items="colOpts"
          :value="gridCols"
          label="Number of Columns"
          @change="handleOnChangeCols($event)"
        ></v-select>
      </div>
    </div>

    <div class="d-flex align-center w-100 justify-space-around ">
      <div v-if="issues.length" class="d-flex justify-center">
        <v-btn class="my-3" color="primary" @click="handleOnClickLoadImages()">
          <v-icon class="mr-1">fa-th</v-icon>Create Photo</v-btn
        >
      </div>
    </div>

    <div>
      <v-divider v-if="!canvasClean" class="my-3"></v-divider>
      <canvas
        class="productImage"
        ref="imageCanvas"
        id="productImage"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>

      <v-divider v-if="!canvasClean" class="my-3"></v-divider>

      <ImageDebug
        :defaultPadding="padding"
        :defaulImageSize="defaulImageSize"
        :calculatedPadding="calculatedPadding"
        :calculatedDefaultImageSize="calculatedDefaultImageSize"
        :numberOfIssues="numberOfIssues"
      />

      <v-divider v-if="!canvasClean" class="my-3"></v-divider>
    </div>

    <div
      v-if="!canvasClean"
      class="d-flex align-center w-100 justify-space-between "
    >
      <div class="d-flex">
        <v-btn color="red" @click="clearImageGridCanvas()">
          <v-icon class="mr-1">fa-times-circle</v-icon>Reset Image
        </v-btn>
      </div>

      <div class="d-flex">
        <v-btn
          :loading="savingCover"
          color="success"
          class="mx-3"
          @click="handleOnClickSaveCanvas()"
        >
          <v-dialog v-model="savingCover" hide-overlay persistent width="300">
            <v-card color="primary" dark class="pt-2">
              <v-card-text>
                <h4 class="text-center mb-2">
                  <v-icon class="mr-2">fas fa-cloud-upload-alt</v-icon>Saving
                  images...
                </h4>
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mt-1"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-icon class="mr-1">fa-cloud-upload-alt</v-icon>Save Image
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_COVER_PHOTO_UPDATE,
  CURRENT_DRAFT_COVER_PHOTO_CLEAR,
  CURRENT_DRAFT_COVER_PHOTO_SAVING,
  TOGGLE_UTILITY_DRAWER
} from "@/store/mutation-types.js";

import settings from "@/util/settings.js";
import { calculateRowsCols } from "./calculateRowsCols.js";
import ImageDebug from "./ImagesDebug";

import { addDisclaimer } from "./imageHelpers";

const CLOUDINARY_MAX_FILE_SIZE = 10485760;

export default {
  components: {
    ImageDebug
  },
  data() {
    return {
      canvasClean: true,
      padding: 20,

      defaulImageSize: {
        height: 1050,
        width: 690
      },

      rowOpts: [
        { text: "1 Row", value: 1 },
        { text: "2 Rows", value: 2 },
        { text: "3 Rows", value: 3 },
        { text: "4 Rows", value: 4 },
        { text: "5 Rows", value: 5 },
        { text: "6 Rows", value: 6 },
        { text: "7 Rows", value: 7 },
        { text: "8 Rows", value: 8 }
      ],
      colOpts: [
        { text: "1 Column", value: 1 },
        { text: "2 Columns", value: 2 },
        { text: "3 Columns", value: 3 },
        { text: "4 Columns", value: 4 },
        { text: "5 Columns", value: 5 },
        { text: "6 Columns", value: 6 },
        { text: "7 Columns", value: 7 },
        { text: "8 Columns", value: 8 }
      ],
      gridRows: 2,
      gridCols: 3,
      canvasHeight: 0,
      canvasWidth: 0
    };
  },
  computed: {
    ...mapState({
      savingCover: state => state.currentDraft.savingCover,
      issues: state => state.currentDraft.issues
    }),
    numberOfIssues() {
      if (this.issues.length) return this.issues.length;
    },
    calculatedDefaultImageSize() {
      if (this.numberOfIssues == 1) {
        return {
          height: this.defaulImageSize.height,
          width: this.defaulImageSize.width
        };
      }
      if (this.numberOfIssues <= 30) {
        return {
          height: this.defaulImageSize.height / 2,
          width: this.defaulImageSize.width / 2
        };
      }
      if (this.numberOfIssues <= 40) {
        return {
          height: this.defaulImageSize.height / 3,
          width: this.defaulImageSize.width / 3
        };
      }
      if (this.numberOfIssues <= 50) {
        return {
          height: this.defaulImageSize.height / 4,
          width: this.defaulImageSize.width / 4
        };
      }
      if (this.numberOfIssues > 50) {
        return {
          height: this.defaulImageSize.height / 5,
          width: this.defaulImageSize.height / 5
        };
      }
      return this.defaulImageSize;
    },
    calculatedPadding() {
      if (this.numberOfIssues > 40) return this.padding - 10;
      return this.padding;
    }
  },
  created() {
    const total = this.issues.length;
    if (total) {
      const { rows, cols } = calculateRowsCols(total);
      this.gridCols = cols;
      this.gridRows = rows;
    }
  },
  mounted() {
    this.handleOnClickLoadImages();
  },
  methods: {
    canvasFileSize() {
      if (this.$refs && this.$refs.imageCanvas) {
        const data_url = this.$refs.imageCanvas.toDataURL("image/png");
        const head = "data:image/png;base64,";
        const fileSize = Math.round(((data_url.length - head.length) * 3) / 4);
        if (fileSize > CLOUDINARY_MAX_FILE_SIZE) {
          console.log("warn user we hit to big a picture");
        }
        return fileSize;
      }
    },
    handleOnChangeCols(value) {
      this.gridCols = value;
    },
    handleOnChangeRows(value) {
      this.gridRows = value;
    },
    handleOnClickLoadImages() {
      this.canvasClean = false;
      const canvas = this.$refs.imageCanvas;
      this.configureCanvas();
      this.loadImagesGrid(canvas);

      addDisclaimer(canvas, this.gridCols, this.gridRows);
    },

    //
    handleOnClickSaveCanvas() {
      this.handleImageUploading();
    },
    //

    //
    configureCanvas() {
      //we first need to know our gird layout and there locations
      const rows = this.gridRows;
      const cols = this.gridCols;
      if (!rows && !cols) return false;

      //get canvase and context objects
      const canvas = this.$refs.imageCanvas;

      let pHeight = this.calculatedDefaultImageSize.height + this.padding;
      //single issue padding so text fits
      if (this.issues.length == 1)
        pHeight = this.calculatedDefaultImageSize.height + this.padding + 30;

      const pWidth = this.calculatedDefaultImageSize.width + this.padding;

      const cHeight = this.gridRows * pHeight;
      const cWidth = this.gridCols * pWidth;
      //set our canvas properties
      canvas.height = cHeight;
      canvas.width = cWidth;
      canvas.setAttribute(
        "style",
        `height: ${Math.ceil(cHeight / 3)}px; width: ${Math.ceil(cWidth / 3)}px`
      );
    },

    //
    //
    //
    //
    loadImagesGrid(canvas) {
      //we first need to know our gird layout and there locations
      const rows = this.gridRows;
      const cols = this.gridCols;
      if (!rows && !cols) return false;

      //loop through our grid loctions then call image based off index we are on?
      let x, y; //row, col location
      let z = 0; //issue counter

      //forearch row/cols
      for (x = 0; x < rows; x++) {
        for (y = 0; y < cols; y++) {
          const issue = this.issues[z]; //selected Issue Number
          if (!issue) return false;
          this.handleImageLoading(issue, x, y, canvas);
          z++; //increase issue count
        } //for cols
      } //for rows
    },
    //
    //
    //
    //figures our how big each grid size is
    calculateGridItemSize() {
      if (!this.gridCols && !this.gridRows) return false;
      const canvas = this.$refs.imageCanvas;

      const width = Math.ceil(parseInt(canvas.width) / parseInt(this.gridCols));
      const height = Math.ceil(
        parseInt(canvas.height) / parseInt(this.gridRows)
      );
      return { height, width };
    },
    //
    //
    /**
     * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth width of source image
     * @param {Number} srcHeight height of source image
     * @param {Number} maxWidth maximum available width
     * @param {Number} maxHeight maximum available height
     * @return {Object} { width, height }
     */
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
      return {
        width: Math.ceil(srcWidth * ratio),
        height: Math.ceil(srcHeight * ratio)
      };
    },
    //

    optimizedImageUrl(url) {
      const basePath = "https://res.cloudinary.com/ciima/image/upload";
      const productPath = "productPhotos";

      const fileNameArray = url.split(`/${productPath}/`);
      const fileName = fileNameArray[1];

      const src = `${basePath}/f_auto,fl_lossy,q_auto/${productPath}/${fileName}`;
      return src;
    },
    //
    //
    handleImageLoading(issue, x, y, canvas, z) {
      const _canvas = canvas;
      const padding = this.padding;

      let ctx = canvas.getContext("2d");

      const calculateAspectRatioFit = this.calculateAspectRatioFit;
      const drawImageGridLines = this.drawImageGridLines;

      //get our grid size
      const gridItemSize = this.calculateGridItemSize(); //figure out our grid size

      //creat image object
      const imageUrl = issue.imageUrl;
      const img = new Image();

      //creatOnLoad Handler
      img.onload = function() {
        const resized = calculateAspectRatioFit(
          img.width,
          img.height,
          gridItemSize.width,
          gridItemSize.height
        );

        const xPos = gridItemSize.width * y;
        const yPos = gridItemSize.height * x;

        //drawgrid lines
        drawImageGridLines(ctx, resized, xPos, yPos);

        //draw images
        const rWidth = resized.width - padding;
        const rHeight = resized.height - padding;
        ctx.drawImage(
          this,
          xPos + padding / 2,
          yPos + padding / 2,
          rWidth,
          rHeight
        );
      };

      const fullImagePath = `${settings.MEDIA_URL}${imageUrl}`;

      //set img.src so the image loads
      img.crossOrigin = "Anonymous";
      //TODO move this through vuex???

      img.src = `/v1/imageFetch?url=${encodeURIComponent(fullImagePath)}`;
    },
    //
    //
    //
    //
    drawImageGridLines(ctx, { height, width }, xPos, yPos) {
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = this.padding;
      ctx.rect(xPos, yPos, width, height);
      ctx.stroke();
    },
    //
    //
    //
    //

    //
    //
    async clearImageGridCanvas() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Clear the current Image?</h3>
          <p>This will clear the current canvas. <em>All your Title, Issue data will remain intact.</em> </p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) {
        const canvas = this.$refs.imageCanvas;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.$store.commit(`currentDraft/${CURRENT_DRAFT_COVER_PHOTO_CLEAR}`);
        this.canvasClean = true;
      }
    },
    //
    //
    //
    //

    //
    //
    //
    //
    handleImageUploading() {
      const _this = this;

      const canvas = this.$refs.imageCanvas;
      const img = canvas.toDataURL("image/png");

      var unsignedUploadPreset = "ciima_unsigned";
      var cloudName = "ciima"; //FPVLink rebrand
      var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;

      //
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open("POST", url, true);

      _this.$store.commit(
        `currentDraft/${CURRENT_DRAFT_COVER_PHOTO_SAVING}`,
        true
      );

      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            // File uploaded successfully
            var response = JSON.parse(xhr.responseText);
            var url = response.secure_url;

            //commit to state\
            _this.$store.commit(
              `currentDraft/${CURRENT_DRAFT_COVER_PHOTO_UPDATE}`,
              _this.optimizedImageUrl(url)
            );

            _this.$store.commit(
              `currentDraft/${CURRENT_DRAFT_COVER_PHOTO_SAVING}`,
              false
            );

            _this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, true);
          } else {
            _this.$store.commit(
              `currentDraft/${CURRENT_DRAFT_COVER_PHOTO_SAVING}`,
              false
            );
            var response = JSON.parse(xhr.responseText);
            const errorMessage = response.error.message;

            //// TODO: log these errors better to loggin service
            _this.$toastr.e(`Error Uploading File - $${errorMessage}`);
          }
        }
      };

      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
      fd.append("file", img);
      fd.append("folder", "productPhotos");
      xhr.send(fd);
    }
  }
};
</script>
<style scoped>
canvas.productImage {
  background-color: grey;
}
</style>
