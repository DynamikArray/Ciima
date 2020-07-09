<template>
  <div class="d-flex justify-center align-center w-100 flex-wrap">
    <h4 class="d-flex mx-4">DEBUG</h4>
    <h5 class="caption d-flex mx-4">
      defaultPadding <br />{{ defaultPadding }}
    </h5>
    <h5 class="caption d-flex mx-4 flex-grow">
      defaultImageSize <br />
      {{ defaulImageSize }}
    </h5>
    <h5 class="caption d-flex mx-4">
      Padding: <br />
      {{ calculatedPadding }}
    </h5>
    <h5 class="caption d-flex mx-4 flex-grow">
      calculatedDefaultImageSize <br />
      {{ calculatedDefaultImageSize }}
    </h5>
    <h5 class="caption d-flex mx-4">
      # Issues: <br />
      {{ numberOfIssues }}
    </h5>
    <h5 class="caption d-flex mx-4">
      Filesize: <br />
      {{ this.$refs && this.$refs.imageCanvas ? canvasFileSize() : "n/a" }}
    </h5>
  </div>
</template>

<script>
export default {
  props: {
    defaultPadding: [Number],
    calculatedPadding: [Number],
    defaulImageSize: [Object],
    calculatedDefaultImageSize: [Object],
    numberOfIssues: [Number]
  }
};
</script>

<style scoped></style>
