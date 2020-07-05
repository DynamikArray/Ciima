<template>
  <v-card>
    <v-card-title>
      Average Items Prices
    </v-card-title>
    <v-card-text>
      Some TExt
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    days: [Number],
    userName: [String],
    analyticsData: [Boolean, Array],
    loading: [Boolean]
  },
  computed: {}
};
</script>

<style scoped></style>
