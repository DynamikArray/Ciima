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

export default {
  data() {
    return {
      canvasClean: true,
      padding: 20,
      defaulImageSize: {
        height: 1050 / 2,
        width: 690 / 2
      },

      rowOpts: [
        { text: "1 Row", value: 1 },
        { text: "2 Rows", value: 2 },
        { text: "3 Rows", value: 3 },
        { text: "4 Rows", value: 4 },
        { text: "5 Rows", value: 5 }
      ],
      colOpts: [
        { text: "1 Column", value: 1 },
        { text: "2 Columns", value: 2 },
        { text: "3 Columns", value: 3 },
        { text: "4 Columns", value: 4 },
        { text: "5 Columns", value: 5 }
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
    })
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
      this.addDisclaimer(canvas);
    },
    //
    //
    handleOnClickSaveCanvas() {
      this.handleImageUploading();
    },
    //
    //
    //
    //
    configureCanvas() {
      //we first need to know our gird layout and there locations
      const rows = this.gridRows;
      const cols = this.gridCols;
      if (!rows && !cols) return false;

      //get canvase and context objects
      const canvas = this.$refs.imageCanvas;

      let pHeight = this.defaulImageSize.height + this.padding;
      //single issue padding so text fits
      if (this.issues.length == 1)
        pHeight = this.defaulImageSize.height + this.padding + 30;

      const pWidth = this.defaulImageSize.width + this.padding;

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
    //
    //
    //
    handleImageLoading(issue, x, y, canvas, z) {
      const addDisclaimer = this.addDisclaimer;
      const _canvas = canvas;
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
        const padding = 20;
        const rWidth = resized.width - padding;
        const rHeight = resized.height - padding;
        ctx.drawImage(
          this,
          xPos + padding / 2,
          yPos + padding / 2,
          rWidth,
          rHeight
        );

        //addDisclaimer(canvas);
        //        _this.addDisclaimer(canvas);
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
      ctx.lineWidth = 20;
      ctx.rect(xPos, yPos, width, height);
      ctx.stroke();
    },
    //
    //
    //
    //
    addDisclaimer(canvas) {
      const fontHeight = this.gridCols * 10;
      const disclaimerHeight = this.gridCols * 35;

      canvas.height = canvas.height + disclaimerHeight;

      const ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      ctx.font = `normal bold ${fontHeight}px Verdana`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#EEE";
      ctx.fillText(
        "Stock covers shown, not actual product photos.",
        canvas.width / 2,
        canvas.height - this.gridCols * 25
      );

      ctx.font = `normal bold ${fontHeight}px Verdana`;
      ctx.fillText(
        "We do not distinguish betweeen newsstand and direct editions.",
        canvas.width / 2,
        canvas.height - this.gridRows * 5
      );
    },

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
              url
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
            _this.$toastr.e("Error Uploading File");
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
