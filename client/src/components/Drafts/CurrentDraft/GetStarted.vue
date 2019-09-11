<template>
  <v-card elevation="10" outlined class="grey darken-4">
    <v-card-text>
      <div class="f-flex align-center">
        <h1 class="display-2 mb-3">Get Started</h1>
      </div>
      <div class="d-flex flex-row justify-start ">
        <div class="d-flex align-center">
          <ul>
            <li>
              Start searching through the Comic Titles to find the desired
              issues.
            </li>
            <li>
              Once you have selected a title, you will be presented with that
              titles comic issues.
            </li>
            <li>
              You will then be able create a Main prodcut photo as well as
              download all the issue photos.
            </li>
          </ul>
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
