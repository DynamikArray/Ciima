<template>
  <v-dialog v-model="loading" hide-overlay persistent width="300">
    <v-card color="primary" dark class="pt-2">
      <v-card-text>
        <h4 class="text-center mb-2">
          <v-icon class="mr-2">fas fa-list-alt</v-icon>
          Searching our issues ...
        </h4>
        <v-progress-linear
          indeterminate
          color="white"
          class="mt-1"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    loading: [Boolean]
  }
};
</script>

<style scoped></style>
