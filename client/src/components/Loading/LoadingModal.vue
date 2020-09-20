<template>
  <v-dialog :value="loading" hide-overlay persistent width="300">
    <v-card color="primary" dark class="pt-2">
      <v-card-text>
        <div class="d-flex align-center mt-1 w-100">
          <h1 class="text-center white--text">
            <v-icon large class="mr-2 ">fas fa-spinner fa-pulse</v-icon>
          </h1>
          <h3 class="text-center white--text">
            Loading Sold Items Report
          </h3>
        </div>
        <div class="w-100 mt-3">
          <v-progress-linear
            indeterminate
            color="white"
            class="mt-3"
          ></v-progress-linear>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: {
      type: [Boolean],
      default: false
    }
  }
};
</script>

<style scoped></style>
