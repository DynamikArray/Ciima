<template>
  <v-row>
    <v-col>
      <div class="w-100 d-flex flex-wrap justify-end align-center">
        FILTERS MAYBE
      </div>
      <v-divider class="my-1"></v-divider>
      <v-tabs-items
        id="CategorySalesReportsWrapper"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="lots" class="pt-2"> </v-tab-item>

        <v-tab-item key="sets" class="pt-2"> </v-tab-item>

        <v-tab-item key="singles" class="pt-2"> </v-tab-item>

        <v-tab-item key="gtcs" class="pt-2"> </v-tab-item>

        <v-tab-item key="adult" class="pt-2"> </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
/*
  <AdultsReport :items="soldItems" :loading="loading" />
*/
export default {};
</script>

<style scoped></style>
