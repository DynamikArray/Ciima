<template>
  <div class="d-flex flex-column">
    <div class="px-3">
      <h1 class="">Issue Matches & Prices</h1>
      <v-divider class="my-1"></v-divider>
    </div>
    <div class="d-flex align-self-stretch">
      <PriceListContainer class="px-3" />
    </div>
  </div>
</template>

<script>
import PriceListContainer from "@/components/PriceList/PriceListContainer";
export default {
  props: {},
  components: {
    PriceListContainer
  }
};
</script>

<style scoped></style>
