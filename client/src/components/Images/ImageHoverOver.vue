<template>
  <v-tooltip v-model="blnShow" color="black" :max-width="540" right>
    <template v-slot:activator="{ on }">
      <div
        :style="`min-height: ${minHeight}px;`"
        class="d-flex justify-center mx-auto pa-1"
      >
        <div class="d-flex align-center">
          <img
            :class="imgClass"
            v-if="imageThumb"
            :key="makeFileNameKey()"
            :src="imageThumb"
            @mouseover="blnShow = true"
            @mouseleave="blnShow = false"
            :style="`max-width: ${maxWidth}px; max-height: ${maxHeight}px;`"
            contain
          />
        </div>
      </div>
    </template>

    <v-img :src="imageFull" :max-width="540" :min-height="260" contain>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="blue darken-1"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-tooltip>
</template>

<script>
/* */
export default {
  data: () => ({
    blnShow: false
  }),
  props: {
    imgClass: [String],
    imageFull: [String, Boolean],
    imageThumb: [String, Boolean],
    minHeight: {
      type: [Number],
      default: 60
    },
    maxHeight: {
      type: [Number],
      default: 50
    },
    maxWidth: {
      type: [Number],
      default: 50
    }
  },
  methods: {
    makeFileNameKey() {
      const thumb = this.imageThumb;
      const path = thumb.split("/").reverse();
      return path[1] || Date.now();
    }
  }
};
</script>

<style scoped></style>
