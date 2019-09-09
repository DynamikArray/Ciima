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
          :value="gridRows"
          label="Number of Columns"
          @change="handleOnChangeCols($event)"
        ></v-select>
      </div>
      <div class="mx-3 grow">
        <v-select
          solo
          :items="rowOpts"
          :value="gridCols"
          label="Number of Rows"
          @change="handleOnChangeRows($event)"
        ></v-select>
      </div>
    </div>

    <v-btn color="success" class="mx-3" @click="loadImagesGrid()"
      >Load Images</v-btn
    >
    <v-btn color="warning" class="mx-3" @click="clearImageGridCanvas()"
      >Reset Grid</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      canvasHeight: 1575,
      canvasWidth: 1035,
      gridRows: 3,
      gridCols: 3,
      gridPadding: 5,
      rowOpts: [
        { text: "1 Row", value: 1 },
        { text: "2 Rows", value: 2 },
        { text: "3 Rows", value: 3 },
        { text: "4 Rows", value: 4 }
      ],
      colOpts: [
        { text: "1 Column", value: 1 },
        { text: "2 Columns", value: 2 },
        { text: "3 Columns", value: 3 },
        { text: "4 Columns", value: 4 }
      ]
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

    loadImagesGrid() {
      //we first need to know our gird layout and there locations
      const rows = this.gridRows;
      const cols = this.gridCols;
      if (!rows && !cols) return false;

      //get canvase and context objects
      const canvas = this.$refs.imageCanvas;
      let ctx = canvas.getContext("2d");

      //loop through our grid loctions then call image based off index we are on?
      let x, y; //row, col location
      let z = 0; //issue counter
      //forearch row
      for (x = 0; x < rows; x++) {
        //foreach column
        for (y = 0; y < cols; y++) {
          //selected Issue Number
          const issue = this.issues[z];
          if (!issue) return false;
          1;
          this.handleImageLoading(issue, x, y, ctx);
          //increase issue count
          z++;
        } //for cols
      } //for rows
    },
    //figures our how big each grid size is
    calculateGridItemSize() {
      if (!this.gridCols && !this.gridRows) return false;
      const canvas = this.$refs.imageCanvas;

      const width = parseInt(canvas.width) / parseInt(this.gridCols);
      const height = parseInt(canvas.height) / parseInt(this.gridRows);
      //console.log(canvas.width, canvas.height, width, height);
      return { height, width };
    },
    calcScaledImageSize(imgSize, gridSize) {
      //console.log(imgSize, gridSize);
      //get existing ratio
      const ratio = imgSize.width / imgSize.height;
      const target = { width: false, height: false };

      target.width = gridSize.height * ratio;
      target.height = gridSize.width * ratio;

      //console.log(ratio, target.width, target.height);
      /*
      if (wRatio > 1) {
        target.width = gridSize.height * wRatio;
        //target.height = gridSize.width * ratio;
      } else {
        //target.height = gridSize.width / ratio;
        target.width = gridSize.height / wRatio;
      }

      if (hRatio > 1) {
        target.height = gridSize.width * hRatio;
      } else {
        target.height = gridSize.width / hRatio;
      } */

      //console.log(hRatio, wRatio, target);
      return { target };
    },

    handleImageLoading(issue, x, y, ctx, z) {
      //console.log("Row:", x, "at Col:", y);
      const calcScaledImageSize = this.calcScaledImageSize; //local instance of method
      const gridItemSize = this.calculateGridItemSize(); //figure out our grid size

      //console.log(gridItemSize);

      //image object
      const imageUrl = issue.imageUrl;
      const img = new Image();

      //creatOnLoad Handler
      img.onload = function() {
        const imgSize = calcScaledImageSize(
          {
            height: img.height,
            width: img.width
          },
          gridItemSize
        );

        console.log(gridItemSize.height, gridItemSize.width);

        const xPos = gridItemSize.height * x;
        const yPos = gridItemSize.width * y;

        //const tWidth = imgSize.target.width;
        //const tHeight = imgSize.target.height;
        //
        //scale the image
        //this.width = imgSize.target.width;
        //this.height = imgSize.target.height;
        //console.log("DRAW IMAGE", x, y, xPos, yPos, this);
        //console.log("Row:", x, "Location:", xPos, "Col:", y, "Location:", yPos);
        //        console.log(xPos, yPos);

        ctx.drawImage(this, yPos, xPos);
        //ctx.drawImage(this, xPos, yPos, imgSize.width, imgSize.height);
      };

      //set img.src so the image loads
      img.src = `http://searchlightcomics.com${imageUrl}`;
    },
    //
    //
    clearImageGridCanvas() {
      const canvas = this.$refs.imageCanvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};
</script>

<style scoped>
canvas.productImage {
  height: calc(1575px / 3.5);
  width: calc(1035px / 3.5);
  background-color: #eee;
}
</style>
