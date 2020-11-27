<template>
  <div class="d-flex flex-column align-start justify-start w-100">
    <div class="d-flex align-start justify-start">
      <h1 class="display-1">
        Items That Have Been Repriced in the last 24 hours
      </h1>
    </div>
    <div class="w-100">
      <v-divider class="my-1" />
    </div>
    <div class="d-flex align-start justify-start w-100">
      <Datatable :items="items" :loading="loading" />
    </div>
  </div>
</template>

<script>
import Datatable from "../Datatable/BeenRepricedDT";

export default {
  name: "BeenRepricing",
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    Datatable
  }
};
</script>

<style scoped></style>
