<template>
  <div class="pa-2 grey darken-4">
    <v-scroll-x-transition mode="out-in">
      <div style="width:540px; height:500px" :key="`wrapper -${imageFull}`">
        <v-img
          :src="imageFull"
          :max-width="540"
          :max-height="500"
          contain
          :key="`img-${imageFull}`"
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
    </v-scroll-x-transition>
  </div>
</template>

<script>
export default {
  props: {
    imageFull: {
      type: [String]
    }
  }
};
</script>

<style scoped></style>
