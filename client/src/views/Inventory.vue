<template>
  <v-container fluid>
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h5 class="text-center mt-2">
          Return to <br />
          Title Search
        </h5>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        Some Button Maybe
      </div>
    </div>

    <v-row no-gutters>
      <v-divider class="my-3"></v-divider>
    </v-row>
    <v-row no-gutters>
      <v-col class="text-center">
        <h1>INVENTORY RESLTS CAN GO IN HERE</h1>
        <v-skeleton-loader type="table"> </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>

<style scoped></style>
