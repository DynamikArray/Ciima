<template>
  <section>
    <v-card raised outlined>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="searchString"
            label="Search Titles"
            prepend-icon="fa-search"
            debounce="250"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>

    <div>
      <h4>{{ searchString }}</h4>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    searchString: ""
  }),
  methods: {
    handleSubmit() {
      console.log("Handle Submit");
    }
  }
};
</script>

<style scoped></style>
