<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div class="d-flex grow align-center">
          <h3>
            <v-icon small class="mr-2">fas fa-boxes</v-icon>Linnworks Inventory
            <span class="subtitle-2">Search Linnworks Inventory</span>
          </h3>
        </div>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <v-divider class="my-0"></v-divider>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col>
        <LinnworksInventoryContainer />
      </v-col>
    </v-row>

    <v-row dense>
      <v-col center>
        <h4 class="text-center">#placeholder</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LinnworksInventoryContainer from "@/components/Inventory/Linnworks/LinnworksInventoryContainer";
export default {
  components: {
    LinnworksInventoryContainer
  }
};
</script>

<style scoped></style>
