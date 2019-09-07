<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <h3>Input New Inventory Items</h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <Search></Search>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <TitleResults></TitleResults>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Search from "@/components/Search/Search";
import TitleResults from "@/components/Search/TitleResults";

export default {
  components: {
    Search,
    TitleResults
  }
};
</script>

<style scoped></style>
