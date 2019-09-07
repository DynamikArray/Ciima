<template>
  <v-app-bar app clipped-left clipped-right color="blue darken-3" dense>
    <v-app-bar-nav-icon
      @click.stop="toggleNavigationDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="mr-12 align-center">
      <span class="title"><b>CiiMa</b></span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon ripple small @click.stop="toggleSettingsDrawer">
      <v-icon>fa-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    toggleNavigationDrawer: [Function],
    toggleSettingsDrawer: [Function]
  }
};
</script>

<style scoped></style>
