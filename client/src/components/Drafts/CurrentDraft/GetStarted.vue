<template>
  <v-card elevation="10" outlined class="grey darken-4">
    <v-card-text>
      <div class="f-flex align-center">
        <h1 class="display-2 mb-3">Get Started</h1>
      </div>
      <v-divider class="my-1"> </v-divider>
      <div class="d-flex flex-row justify-start ">
        <div class="d-flex flex-column justify-start align-center">
          <div class="d-flex align-center justify-start w-100 my-1">
            <h4>
              <v-icon class="mr-2">fa-search</v-icon>Search for a title
              containing the product issues.
            </h4>
          </div>

          <div class="d-flex align-center justify-start w-100 my-1">
            <h4>
              <v-icon class="mr-2">fa-list-ol</v-icon>Select matching issues to
              be used in listing.
            </h4>
          </div>

          <div class="d-flex align-center justify-start w-100 my-1">
            <h4>
              <v-icon class="mr-2">fa-search</v-icon>Create a product photo from
              issue covers
            </h4>
          </div>
          <div class="d-flex align-center justify-start w-100 my-1">
            <h4>
              <v-icon class="mr-2">fa-plus-square</v-icon>Complete draft details
              form.
            </h4>
          </div>

          <div class="d-flex align-center justify-start w-100 my-1">
            <h4>
              <v-icon class="mr-2">fa-list-alt</v-icon>Submit drafts to
              Linnworks for listing.
            </h4>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-center pt-4">
        <v-btn color="success" to="titles"
          ><v-icon class="mr-2">fa-arrow-alt-circle-right</v-icon> Get Started
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped></style>
