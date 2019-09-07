<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <h3>Input New Inventory Items</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-divider></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <Search class="mt-2"></Search>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Search from "@/components/Search/Search";
export default {
  components: {
    Search
  }
};
</script>

<style scoped></style>
