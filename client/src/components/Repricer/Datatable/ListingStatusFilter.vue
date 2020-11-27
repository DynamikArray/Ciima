<template>
  <div class="d-flex flex-grow w-100 align-center justify-end py-2">
    <div class="d-flex align-center justify-end">
      <span class="mr-2"> Filter By Listing Status:</span>
    </div>
    <div class="d-flex align-center justify-end">
      <v-btn-toggle dark dense v-model="toggle">
        <v-btn @click="emitFilterBy('ok')">
          <v-icon small class="mr-2">fa fa-check-circle</v-icon>Ok
        </v-btn>
        <v-btn @click="emitFilterBy('updating')">
          <v-icon small class="mr-2">fa fa-cog</v-icon>Updating
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data: () => ({
    toggle: false
  }),
  methods: {
    emitFilterBy(val) {
      this.$emit("filterUpdate", val);
    }
  }
};
</script>

<style scoped></style>
