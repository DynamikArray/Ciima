<template>
  <v-card class="pa-0">
    <v-card-title class="pa-1">
      <div class="d-flex justify-space-between align-center w-100">
        <div class="d-flex align-center justify-start">
          <v-icon class="mr-1">fa fa-edit</v-icon>
          <h3>Edit User Account:</h3>
        </div>
        <div class="d-flex align-center justify-start">
          <v-btn icon @click="closeDialog"><v-icon>fa fa-times</v-icon></v-btn>
        </div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-1">
      <v-form
        ref="userUpdateForm"
        v-model="valid"
        lazy-validation
        class="pa-3"
        v-on:submit="formSubmit"
      >
        <v-text-field
          autocomplete="off"
          dense
          :value="user.displayname"
          @input="updateDisplayname"
          id="Display Name"
          name="Display Name"
          outlined
          label="Display Name"
          hint="Display Name of this user"
          :rules="fieldRules.displayname"
          v-on:keydown.enter.prevent
        ></v-text-field>

        <div class="d-flex justify-center align-center w-100 flex-column">
          <h4>Display Color:</h4>
          <div class="d-flex justify-center align-center w-100">
            <v-color-picker
              width="400"
              dot-size="10"
              show-swatches
              hide-inputs
              hide-canvas
              swatches-max-height="300"
              :value="user.displaycolor"
              @input="updateDisplaycolor"
            />
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <div class="d-flex justify-space-between align-center w-100">
        <div class="d-flex justify-start align-center">
          <v-btn color="red" @click="closeDialog"
            ><v-icon class="mr-1">fa fa-times-circle</v-icon>Cancel</v-btn
          >
        </div>
        <div class="d-flex justify-end align-center">
          <v-btn type="submit" color="success" @click="formSubmit"
            ><v-icon class="mr-1">fa fa-save</v-icon>Save</v-btn
          >
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { fieldNames, fieldRules } from "./fieldNamesAndRules.js";
import { mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "user/getField",
  mutationType: "user/updateField"
});

export default {
  props: {
    closeDialog: [Function]
  },

  data: () => ({
    valid: false,
    fieldRules,
    displayname: "",
    displaycolor: ""
  }),
  computed: {
    ...mapFields(["user"])
  },
  methods: {
    updateDisplayname(val) {
      this.displayname = val;
    },
    updateDisplaycolor(val) {
      this.displaycolor = val;
    },
    async formSubmit() {
      const params = {
        displayname: this.displayname,
        displaycolor: this.displaycolor
      };

      const response = await this.$store.dispatch(`user/updateUser`, params, {
        root: true
      });

      if (response.result) {
        if (response.result.affectedRows == 1) {
          this.$toastr.s("SUCCESS! User Record Saved");
          this.closeDialog();
          this.$store.dispatch(`user/loginCheck`, {}, { root: true });
        }
      } else {
        this.$toastr.e("FAILED! User Record NOT Saved");
      }
    }
  }
};
</script>

<style scoped></style>
