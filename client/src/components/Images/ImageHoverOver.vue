<template>
  <v-tooltip color="black" :max-width="340" right>
    <template v-slot:activator="{ on }">
      <v-img :src="imageThumb" v-on="on" max-width="40" />
    </template>
    <v-img :src="imageFull" :max-width="340" contain> </v-img>
  </v-tooltip>
</template>

<script>
/* */
export default {
  props: {
    imageFull: [String],
    imageThumb: [String]
  }
};
</script>

<style scoped></style>
