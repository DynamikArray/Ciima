<template>
  <v-dialog
    v-model="dialog"
    overlay-color="grey darken-2"
    overlay-opacity=".75"
    width="500px"
    elevation="10"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="d-flex align-end justify-end mx-3" v-if="issue.hasMatch">
        <div class="d-flex flex-column align-center justify-center">
          <h5>Matched:</h5>
          <h4 class="mt-1">
            <v-btn color="secondary" v-bind="attrs" v-on="on">
              <v-icon color="green" small class="mr-1">fa fa-link</v-icon>View
            </v-btn>
          </h4>
        </div>
      </div>
    </template>
    <h1>STUFF AND THINGS</h1>
  </v-dialog>
</template>

<script>
export default {
  props: {
    issue: [Boolean, Object]
  }
};
</script>

<style scoped></style>
