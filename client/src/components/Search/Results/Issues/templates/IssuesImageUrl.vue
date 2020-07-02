<template>
  <v-img
    :src="makeImageUrl(item)"
    width="70"
    height="105"
    class="ma-1"
    @click="showImageModal(item.rowNumber)"
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
</template>

<script>
import settings from "@/util/settings.js";
export default {
  props: {
    item: [Object],
    showImageModal: [Function]
  },
  methods: {
    makeImageUrl(item) {
      return `${settings.MEDIA_URL}${item.imageUrl}`;
    }
  }
};
</script>

<style scoped></style>
