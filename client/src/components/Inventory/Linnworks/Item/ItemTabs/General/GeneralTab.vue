<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="4">
        <v-img :src="item.Image" contain :maxHeight="200" />
      </v-col>
      <v-col cols="8">
        <h3 class="">
          {{ item.ItemTitle }}
        </h3>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4"> 4</v-col>
      <v-col cols="4"> 4</v-col>
      <v-col cols="4"> 4</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">4 </v-col>
      <v-col cols="4">4 </v-col>
      <v-col cols="4">4 </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4"> 4</v-col>
      <v-col cols="4"> 4</v-col>
      <v-col cols="4"> 4</v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">4 </v-col>
      <v-col cols="4">4 </v-col>
      <v-col cols="4">4 </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: [Boolean, Object]
    }
  }
};
</script>

<style scoped></style>
