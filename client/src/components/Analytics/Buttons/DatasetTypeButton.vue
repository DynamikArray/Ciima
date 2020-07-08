<template>
  <div class="d-flex justify-start align-center">
    <h4 class="mr-2">Viewing Data For:</h4>
    <v-btn-toggle dense v-model="buttonToggle" mandatory color="primary">
      <v-btn @click="onClickHandler(true)">
        <v-icon v-show="buttonToggle == 0" small class="mr-1"
          >fa-check-circle</v-icon
        >
        New Items
      </v-btn>
      <v-btn @click="onClickHandler(false)">
        <v-icon v-show="buttonToggle == 1" small class="mr-1"
          >fa-check-circle</v-icon
        >
        Stock Updates
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  props: {
    isActive: [Boolean]
  },
  data: () => ({
    buttonToggle: 0
  }),
  methods: {
    onClickHandler(val) {
      this.$emit("update:isActive", val);
    }
  }
};
</script>

<style scoped></style>
