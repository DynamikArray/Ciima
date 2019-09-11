<template>
  <v-footer app>
    <div class="d-flex grow justify-space-between w-100">
      <div class="d-flex grow align-center"></div>

      <div class="d-flex align-center">
        <span class="mx-1">Brian Ridsdale</span>
        <span class="mx-1">&copy; {{ currentYear }}</span>
      </div>

      <div class="d-flex justify-center ml-4">
        <v-btn small text icon href="/docs">
          <v-icon small>fa-server</v-icon>
        </v-btn>
      </div>
    </div>
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

<style scoped>
.navProgressBar {
  width: 200px;
}
</style>
