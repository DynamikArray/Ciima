<template>
  <div class="d-flex align-center justify-center my-2">
    <v-dialog v-model="dialog" max-width="620px">
      <UserUpdateForm :closeDialog="closeDialog" />
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          style="min-width:20px;"
          class="pr-3 mb-1"
          color="warning"
          @click.stop="dialog = true"
          ><v-icon color="white" small class="mr-1">fa-edit</v-icon>
          Edit User Account
        </v-btn>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import UserUpdateForm from "./UserUpdateForm/UserUpdateForm";
export default {
  props: {},
  components: {
    UserUpdateForm
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
