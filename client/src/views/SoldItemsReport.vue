<template>
  <div class="w-100 pa-3 h-100">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h1 class="text-center my-0">
          Sold Items Reports
        </h1>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="analyticsTabs">
          <v-tab> <v-icon left>fab fa-stack-overflow</v-icon>Lots</v-tab>
          <v-tab> <v-icon left>fa fa-images</v-icon>Sets</v-tab>
          <v-tab> <v-icon left>fa fa-image</v-icon>Singles</v-tab>
          <v-tab> <v-icon left>fa fa-images</v-icon>GTCs</v-tab>
          <v-tab> <v-icon left>fa fa-user-shield</v-icon>Adults</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <ReportsContainer :tab="tab" />
    </div>
  </div>
</template>

<script>
import ReportsContainer from "@/components/Reports/ReportsContainer";
export default {
  components: {
    ReportsContainer
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
