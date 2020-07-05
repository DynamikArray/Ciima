<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h2 class="text-center mt-2">
          Inventory Locations:
          <span class="subtitle-1">Boxes, Cards & Labels</span>
        </h2>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-card>
          <v-card-text>
            In order to create a label you must first select the box.
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-divider class="my-3"></v-divider>

    <v-row class="pt-0 mt-0">
      <v-col class="pt-0 mt-0">
        <LocationContainer></LocationContainer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LocationContainer from "@/components/Location/LocationContainer";

export default {
  components: {
    LocationContainer
  }
};
</script>

<style scoped></style>
