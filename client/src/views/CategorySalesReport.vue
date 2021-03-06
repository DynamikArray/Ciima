<template>
  <div class="w-100 pa-3 h-100">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h1 class="text-center my-0">
          Category Sales Reports
        </h1>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="CategorySalesReports">
          <v-tab> <v-icon left>fa fa-calendar-day</v-icon>Daily</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <CategorySalesReportContainer :tab="tab" />
    </div>
  </div>
</template>

<script>
import CategorySalesReportContainer from "@/components/ReportsCategorySales/CategorySalesReportContainer.vue";
export default {
  components: {
    CategorySalesReportContainer
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
