<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h5 class="text-center mt-2 display-3">
          Inventory Locations
        </h5>
      </div>
      <div class="d-flex flex-column align-self-center mr-4"></div>
    </div>

    <v-divider class="my-3"></v-divider>

    <LocationContainer></LocationContainer>
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
