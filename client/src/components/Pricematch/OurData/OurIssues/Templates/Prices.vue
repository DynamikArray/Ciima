<template>
  <div v-if="prices.length > 0" class="">
    <v-tooltip left :max-width="420" color="info">
      <template v-slot:activator="{ on }">
        <v-btn icon label color="white" v-on="on" class=" textShadow">
          <v-icon class="">
            fa fa-comment-dollar
          </v-icon>
        </v-btn>
      </template>
      <div v-if="prices" class="w-100 text-center">
        <h4>Current Prices:</h4>
        <v-divider class="my-1"></v-divider>
        <div
          class="d-flex align-center justify-space-between w-100"
          v-for="price in prices"
        >
          <div class="mr-4 ml-1">
            {{ price.grade }}
          </div>
          <div class="ml-4 mr-1">
            {{ price.price | currency }}
          </div>
        </div>
      </div>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    prices: [Boolean, Array]
  }
};
</script>

<style scoped></style>
