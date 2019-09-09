<template>
  <div class="text-center">
    <div class="d-flex align-center w-100 justify-space-around mb-2">
      <div class="mr-3 grow">
        <v-select
          solo
          hide-details
          :items="colOpts"
          :value="gridCols"
          label="Number of Columns"
          @change="handleOnChangeCols($event)"
        ></v-select>
      </div>
      <div class="ml-3 grow">
        <v-select
          solo
          hide-details
          :items="rowOpts"
          :value="gridRows"
          label="Number of Rows"
          @change="handleOnChangeRows($event)"
        ></v-select>
      </div>
    </div>

    <div class="d-flex align-center w-100 justify-space-around ">
      <div v-if="issues.length" class="d-flex justify-center">
        <v-btn color="primary" @click="handleOnClickLoadImages()">
          <v-icon class="mr-1">fa-th</v-icon>Build Photo</v-btn
        >
      </div>
      <div v-if="!issues.length" class="d-flex justify-center">
        <v-card class="mt-5">
          <v-card-title>
            <h2>No Issues Selected</h2>
          </v-card-title>
          <v-card-text>
            <h3 class="p-4 m-4 text-left">
              <v-icon large class="mb-1 mr-1">fa-info-circle</v-icon>
              You must first select issues and add them to your current draft.
              All issues in the current draft will be added to the Prodcut Photo
              in the order they are listed.
            </h3>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="success" :to="'titles'">
              <v-icon class="mr-1">fa-search</v-icon>Search Titles</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div>
      <v-divider class="my-3"></v-divider>
      <canvas
        class="productImage"
        ref="imageCanvas"
        id="productImage"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
      <v-divider class="my-3"></v-divider>
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
  CURRENT_DRAFT_COVER_PHOTO_SAVING
} from "@/store/mutation-types.js";

export default {
  data() {
    return {
      canvasClean: true,
      defaulImageSize: {
        height: 1050,
        width: 690
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
  mounted() {},
  methods: {
    handleOnChangeCols(value) {
      this.gridCols = value;
    },
    handleOnChangeRows(value) {
      this.gridRows = value;
    },
    handleOnClickLoadImages() {
      this.canvasClean = false;
      const canvas = this.configureCanvas();
      let ctx = canvas.getContext("2d");

      this.addDisclaimer(canvas);
      this.loadImagesGrid(ctx);
      //
      //this.drawCanvasBackground(canvas);
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
      const cHeight = this.gridRows * this.defaulImageSize.height;
      const cWidth = this.gridCols * this.defaulImageSize.width;
      //set our canvas properties
      canvas.height = cHeight;
      canvas.width = cWidth;
      canvas.setAttribute(
        "style",
        `height: ${Math.ceil(cHeight / 4)}px; width: ${Math.ceil(cWidth / 4)}px`
      );

      //return the context object for this canvas
      return canvas;
    },
    //
    //
    //
    //
    drawCanvasBackground(canvas) {
      console.log("draw background");
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "green";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    //
    //
    //
    //
    loadImagesGrid(ctx) {
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
          this.handleImageLoading(issue, x, y, ctx);
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
      //console.log(canvas.width, canvas.height, width, height);
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
    handleImageLoading(issue, x, y, ctx, z) {
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
        const padding = 40;
        const rWidth = resized.width - padding;
        const rHeight = resized.height - padding;
        ctx.drawImage(this, xPos + 20, yPos + 20, rWidth, rHeight);
      };

      //set img.src so the image loads
      img.crossOrigin = "Anonymous";

      //PROXY THIS URL THROUGH OUR API
      img.src = `/v1/imageFetch?url=http://searchlightcomics.com${imageUrl}`;
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
      const disclaimerHeight = 240;
      canvas.height = canvas.height + disclaimerHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //ctx.globalCompositeOperation = "source-over";

      ctx.font = "normal bold 60px Verdana";
      ctx.textAlign = "center";
      ctx.fillStyle = "#EEE";
      ctx.fillText(
        "!!! Stock Cover Images Shown In Product Photos !!!",
        canvas.width / 2,
        canvas.height - 10
      );
    },
    //
    //
    clearImageGridCanvas() {
      const canvas = this.$refs.imageCanvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_COVER_PHOTO_CLEAR}`);
      this.canvasClean = true;
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
        if (xhr.readyState == 4 && xhr.status == 200) {
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
        }
      };

      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
      fd.append("file", img);
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
