<template>
  <v-dialog persistent v-model="blnShow" width="400" class="primary" elevation="5">
    <v-card class="ma-0 pa-0">
      <v-card-title class="ma-0 pa-2 primary">
        <div class="d-flex justify-space-between align-start flex-fill">
          <div class="d-flex">
            <h3 class="textShadow">Select User</h3>
          </div>
          <div class="d-flex align-start">
            <v-btn x-small icon color="white" @click="cancelModal"><v-icon class="">fa fa-times-circle</v-icon></v-btn>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="ma-0 pa-2 secondary darken-1 pa-1">
        <div class="d-flex flex-column align-center justify-start flex-fill pa-2">
          <div class="d-flex align-center justify-center">
            <p class="text-center body-1">
              Select a user from below to get started.
            </p>
          </div>
          <div class="d-flex">
            <UserSelect
              @userSelected="userSelected"
              labelText=""
              componentClass="align-center"
              roleToSelect="inputter"
              labelText=""
              class="mx-2"
            />
          </div>
        </div>
        <div class="d-flex align-center justify-center">
          <p class="text-center body-2 pa-2">
            Choose a user to view their performance for a given week. You will still have the ability to change users later,
            as well as view previous weeks.
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import UserSelect from "@/components/Shared/Fields/UserSelect";

export default {
  name: "SelectUserDialog",
  props: {
    selectedUserId: {
      type: [Boolean, Number, String],
      default: false
    }
  },
  watch: {
    selectedUserId: function(newVal) {
      if (newVal) this.blnShow = false;
    }
  },
  components: {
    UserSelect
  },
  data: () => ({
    blnShow: true
  }),
  methods: {
    cancelModal() {
      this.blnShow = false;
    },
    userSelected({ userId, userName }) {
      this.$emit("userSelected", { userId, userName });
    }
  }
};
</script>

<style scoped></style>
