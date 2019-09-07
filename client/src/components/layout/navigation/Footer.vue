<template>
  <v-footer app>
    <v-spacer></v-spacer>
    <span class="mx-1">Brian Ridsdale</span>
    <span class="mx-1">&copy; {{ currentYear }}</span>
  </v-footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      const d = new Date();
      return d.getFullYear();
    }
  }
};
</script>

<style scoped></style>
