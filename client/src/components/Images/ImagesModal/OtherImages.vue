<template>
  <div class="d-flex align-center justify-start">
    <div
      v-for="image in getOtherImages"
      :key="`key-${image.imageUrl}`"
      class="ma-1 grey darken-4 pa-2"
      @click="handleClick(image)"
    >
      <v-img
        :key="`img-${image.imageUrl}`"
        :src="image.imageUrl"
        :style="`max-width: ${maxWidth}px; max-height: ${maxHeight}px;`"
        contain
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="blue darken-1"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    otherImages: [Boolean, Array]
  },
  data: () => ({
    maxWidth: 100,
    maxHeight: 90
  }),
  computed: {
    getOtherImages() {
      return this.otherImages.map(img => {
        if (img.imageUrl.includes("/zCustomApps")) {
          return { imageUrl: `https://searchlightcomics.com${img.imageUrl}` };
        }
        return img;
      });
    }
  },
  methods: {
    handleClick({ imageUrl }) {
      this.$emit("imageSelected", imageUrl);
    }
  }
};
</script>

<style scoped></style>
