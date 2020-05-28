<template>
  <div class="d-flex justify-center align-center">
    <div class="d-flex justify-center flex-column">
      <div class="d-flex justify-center align-center">
        <v-tooltip top color="white">
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <avatar v-if="item" :username="userName" :size="35"></avatar>
            </div>
          </template>
          <span class="black--text">{{ userName }}</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";
export default {
  props: {
    item: [Boolean, Object]
  },
  components: {
    avatar
  },
  computed: {
    userName() {
      if (this.item.user_id == -1) return "Ciima";
      return this.item.username;
    }
  }
};
</script>

<style scoped></style>
