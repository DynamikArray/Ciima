<template>
  <v-container fluid style="min-height:100%">
    <v-row>
      <v-col class="pt-0">
        <AnalyticsContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AnalyticsContainer from "@/components/Analytics/AnalyticsContainer";
export default {
  components: {
    AnalyticsContainer
  }
};
</script>

<style scoped></style>
