<template>
  <div class="text-center">
    <canvas
      class="productImage"
      ref="imageCanvas"
      id="productImage"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>

    <v-divider class="my-3"></v-divider>

    <div class="d-flex align-center w-100 justify-space-around ">
      <div class="mx-3 grow">
        <v-select
          solo
          :items="colOpts"
          :value="gridCols"
          label="Number of Columns"
          @change="handleOnChangeCols($event)"
        ></v-select>
      </div>
      <div class="mx-3 grow">
        <v-select
          solo
          :items="rowOpts"
          :value="gridRows"
          label="Number of Rows"
          @change="handleOnChangeRows($event)"
        ></v-select>
      </div>
    </div>

    <div class="d-flex align-center w-100 justify-space-between ">
      <div class="d-flex grow">
        <v-btn color="success" class="mx-3" @click="handleOnClickSaveCanvas()"
          >Save Image
        </v-btn>
      </div>
      <div class="d-flex">
        <v-btn color="primary" class="mx-3" @click="handleOnClickLoadImages()"
          >Load Images</v-btn
        >
      </div>
      <div class="d-flex">
        <v-btn color="danger" class="mx-3" @click="clearImageGridCanvas()"
          >Reset Grid</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
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
      const ctx = this.configureCanvas();
      this.loadImagesGrid(ctx);
      this.addDisclaimer();
    },
    handleOnClickSaveCanvas() {
      console.log("SAVE THIS IMAGE?");
      const canvas = this.$refs.imageCanvas;
      const img = canvas.toDataURL("image/png");
      console.log(img);
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
      return canvas.getContext("2d");
    },
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

      //forearch row
      for (x = 0; x < rows; x++) {
        //foreach col
        for (y = 0; y < cols; y++) {
          //selected Issue Number
          const issue = this.issues[z];
          if (!issue) return false;
          this.handleImageLoading(issue, x, y, ctx);
          //increase issue count
          z++;
        } //for cols
      } //for rows
    },
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
      img.src = `http://searchlightcomics.com${imageUrl}`;
      //img.setAttribute("crossorigin", "anonymous");
    },
    //
    //
    drawImageGridLines(ctx, { height, width }, xPos, yPos) {
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 20;
      //ctx.globalCompositeOperation = "source-over";
      ctx.rect(xPos, yPos, width, height);
      ctx.stroke();
    },
    //
    //
    addDisclaimer() {
      const disclaimerHeight = 100;
      const canvas = this.$refs.imageCanvas;

      let ctx = canvas.getContext("2d");
      ctx.fillRect(0, canvas.height, canvas.width, disclaimerHeight);
      canvas.height = canvas.height + disclaimerHeight;
      ctx.globalCompositeOperation = "source-over";

      ctx.font = "normal bold 60px Verdana";
      ctx.textAlign = "center";
      ctx.fillText(
        "!!! Stock Cover Images Shown In Product Photos !!!",
        canvas.width / 2,
        canvas.height - 25
      );
    },
    //
    //
    clearImageGridCanvas() {
      const canvas = this.$refs.imageCanvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    handleImageUploading() {}
  }
};
</script>

<style scoped>
canvas.productImage {
  background-color: #efefef;
}
</style>
