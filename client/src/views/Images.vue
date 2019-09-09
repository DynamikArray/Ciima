<template>
  <v-container fluid>
    <h1><v-icon class="mr-2"> fa-image </v-icon>Create Main Product Photo</h1>
    <v-divider class="mb-3"></v-divider>
    <CreateImage></CreateImage>
  </v-container>
</template>

<script>
import CreateImage from "@/components/Images/CreateImage.vue";
export default {
  components: {
    CreateImage
  }
};
</script>

<style scoped></style>
