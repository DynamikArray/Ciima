<template>
  <v-container fluid fill-height class="pa-0">
    <v-row no-gutters>
      <v-col>
        <CommissionCalculator />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommissionCalculator from "@/components/CommissionCalculator/CommissionCalculatorContainer";
export default {
  components: {
    CommissionCalculator
  }
};
</script>

<style scoped></style>
