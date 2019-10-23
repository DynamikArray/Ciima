<template>
  <div>
    <v-tooltip v-model="blnShow" color="black" :max-width="340" right>
      <template v-slot:activator="{ on }">
        <img
          :key="makeFileNameKey()"
          :src="getImageThumb()"
          @mouseover="blnShow = true"
          @mouseleave="blnShow = false"
          :max-height="60"
          contain
        />
      </template>

      <v-img :src="imageFull" :max-width="340" contain>
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
  </div>
</template>

<script>
/* */
export default {
  data: () => ({
    blnShow: false
  }),
  props: {
    imageFull: [String],
    imageThumb: [String]
  },
  methods: {
    getImageThumb() {
      return this.imageThumb;
    },
    makeFileNameKey() {
      const thumb = this.imageThumb;
      const path = thumb.split("/").reverse();
      return path[1] || Date.now();
    }
  }
};
</script>

<style scoped></style>
