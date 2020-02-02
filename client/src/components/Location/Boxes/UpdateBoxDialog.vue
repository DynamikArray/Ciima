<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card raised>
        <v-card-title class="pb-1 pl-3 pt-2 primary text--white textShadow">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="d-flex align-center ">
              <i class="fa fa-cube mr-1"></i>Edit Existing Box
            </div>
            <div class="d-flex align-center">
              <v-icon small @click="cancelEdit" class="text--grey darken-2"
                >fa-times</v-icon
              >
            </div>
          </div>
        </v-card-title>

        <v-divider class="mb-3"></v-divider>

        <v-card-text class="pb-1">
          <v-form
            ref="boxForm"
            v-model="valid"
            lazy-validation
            class="pa-3"
            @submit.prevent="saveBox"
          >
            <div class="">
              <div class="d-flex justify-center align-center">
                <div class="d-flex justify-start align-center mr-4">
                  <h3>Box Type:</h3>
                </div>
                <div class="d-flex justify-start align-center grow">
                  <v-select
                    v-model="box_type"
                    :items="box_types"
                    name="Box Type"
                    label="Box Type"
                    class=""
                    filled
                    placeholder="Box Type"
                    :rules="fieldRules.box_type"
                  >
                  </v-select>
                </div>
              </div>

              <div class="d-flex justify-center align-center">
                <div class="d-flex justify-start align-center mr-4">
                  <h3>Box Name:</h3>
                </div>
                <div class="d-flex justify-start align-center grow">
                  <v-text-field
                    v-model="box"
                    name="Edit Box"
                    label="Edit Box"
                    class=""
                    filled
                    placeholder="Box"
                    :rules="fieldRules.box"
                  >
                  </v-text-field>
                </div>
              </div>

              <div class="d-flex justify-center align-center">
                <div class="d-flex justify-start align-center mr-4">
                  <h3>Box Notes:</h3>
                </div>
                <div class="d-flex justify-start align-top grow">
                  <v-textarea
                    v-model="notes"
                    name="Box Notes"
                    label="Box Notes"
                    class=""
                    filled
                    placeholder="Notes"
                    :rules="fieldRules.notes"
                  >
                  </v-textarea>
                </div>
              </div>

              <v-input type="hidden" name="id" v-model="id" />
            </div>
          </v-form>
        </v-card-text>

        <v-divider class="mb-3"></v-divider>

        <v-card-actions>
          <div class="d-flex justify-space-between w-100">
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="red" @click="cancelEdit">
                <v-icon class="mr-1" small>fa-undo</v-icon>Cancel
              </v-btn>
            </div>
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="success" @click="saveBox">
                <v-icon class="mr-1" small>fa-save</v-icon>Save
              </v-btn>
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tooltip top color="grey lighten-2 black--text">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          style="min-width:20px;"
          class="px-3"
          color="warning"
          @click.stop="dialog = true"
          ><v-icon color="white" small>fa-edit</v-icon>
        </v-btn>
      </template>
      <span><i class="fa fa-info-circle mr-1"></i>Edit existing Box </span>
    </v-tooltip>
  </div>
</template>

<script>
import { UPDATE_BOX, SEARCH_BOXES } from "@/store/action-types";
import { box_types } from "./box_types.js";

export default {
  props: {
    idValue: { type: Number },
    boxValue: { type: String },
    boxTypeValue: { type: String },
    notesValue: { type: String }
  },
  created() {
    this.id = this.idValue;
    this.box = this.boxValue;
    this.box_type = this.boxTypeValue;
    this.notes = this.notesValue;
  },
  data: () => ({
    dialog: false,
    valid: true,
    id: "",
    box: "",
    box_type: "",
    box_types,
    notes: "",
    fieldRules: {
      box: [
        v => !!v || "Box is a required field"
        //v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
      ],
      box_type: [v => !!v || "Box Type is a required field"],
      notes: [
        //v => !!v || "Notes is a required field"
        //v => v.length <= 50 || "Location Code must be less than 50 characters"
      ]
    }
  }),
  methods: {
    async saveBox() {
      //validate
      const valid = this.$refs.boxForm.validate();
      if (!valid) return false;

      //is valid so process
      const { id, box, box_type, notes } = this;
      //dispatch an action with our values
      try {
        const { result } = await this.$store.dispatch(
          `locations/${UPDATE_BOX}`,
          {
            id,
            box,
            box_type,
            notes
          }
        );
        //check result
        if (result.affectedRows == 1) {
          //saved ok
          this.$toastr.s("Box Updated!");
          //reset box form values
          this.dialog = false;

          //reload boxes
          this.$store.dispatch(`locations/${SEARCH_BOXES}`);
        } else {
          this.$toastr.e("Box not updataed, no error reported.");
        }
      } catch (e) {
        this.$toastr.e(`An Error has occured: ${e}`);
      }
    },
    cancelEdit() {
      this.id = this.idValue;
      this.box = this.boxValue;
      this.box_type = this.boxTypeValue;
      this.notes = this.notesValue;
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
