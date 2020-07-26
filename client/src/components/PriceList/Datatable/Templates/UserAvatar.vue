<template>
  <div v-if="userName">
    <v-tooltip top color="white">
      <template v-slot:activator="{ on }">
        <div v-on="on" class="">
          <Avatar
            :username="userName"
            :size="30"
            class="mr-1"
            :lighten="100"
          ></Avatar>
        </div>
      </template>
      <h4 class="black--text noShadow">{{ userName }}</h4>
    </v-tooltip>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  props: {
    userName: [Boolean, String]
  },
  components: {
    Avatar
  }
};
</script>

<style scoped></style>
