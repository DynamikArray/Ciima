<template>
  <div>
    <v-dialog v-model="dialog" max-width="620px">
      <v-card>
        <v-card-title class="pb-1 pl-3 pt-2 primary text--white textShadow">
          <div class="d-flex justify-space-between align-center w-100 ">
            <div class="d-flex align-center ">
              <i class="fa fa-sd-card mr-1"></i>Update Existing Card
            </div>
            <div class="d-flex align-center">
              <v-icon small @click="cancelUpdate" class="text--grey darken-2"
                >fa-times</v-icon
              >
            </div>
          </div>
        </v-card-title>

        <v-divider class="mb-3"></v-divider>

        <v-card-text class="pb-1">
          <div
            class="d-flex justify-space-start align-center w-100 yellow darken-4 px-4 py-2 white--text textShadow "
          >
            <h3
              class="d-flex align-center text-left mx-2"
              style="flex-shrink:0;"
            >
              <v-icon class="mr-2" small>fa fa-cube</v-icon> Selected Box:
            </h3>
            <h2 class="d-flex align-center text-left mx-2">
              {{ box }}
            </h2>
          </div>

          <v-divider class="my-2"></v-divider>

          <v-form
            ref="cardsForm"
            v-model="valid"
            lazy-validation
            class="pa-3"
            @submit.prevent="updateCard"
          >
            <div class="">
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex justify-center align-center shrink">
                  <div class="d-flex justify-center align-center">
                    <div class="d-flex justify-start align-center mr-4">
                      <h3>Box Card #:</h3>
                    </div>
                    <div class="d-flex justify-start align-center shrink mr-2">
                      <v-text-field
                        v-model="card"
                        name="Card #"
                        label="Card #"
                        class=""
                        filled
                        placeholder="Card #"
                        :rules="fieldRules.card"
                      >
                      </v-text-field>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center align-center">
                <div class="d-flex justify-start align-center mr-4">
                  <h3>Card Notes:</h3>
                </div>
                <div class="d-flex justify-start align-top grow">
                  <v-textarea
                    v-model="notes"
                    name="Card Notes"
                    label="Card Notes"
                    class=""
                    filled
                    placeholder="Notes"
                    :rules="fieldRules.notes"
                  >
                  </v-textarea>
                </div>
              </div>
            </div>
          </v-form>
        </v-card-text>

        <v-divider class="mb-3"></v-divider>

        <v-card-actions>
          <div class="d-flex justify-space-between w-100">
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="red" @click="cancelUpdate">
                <v-icon class="mr-1" small>fa-undo</v-icon>Cancel
              </v-btn>
            </div>
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="success" @click="updateCard">
                <v-icon class="mr-1" small>fa-save</v-icon>Update
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
          ><v-icon color="white" small class="mr-1">fa-edit</v-icon>
        </v-btn>
      </template>
      <span><i class="fa fa-info-circle mr-1"></i>Edit an existing Card </span>
    </v-tooltip>
  </div>
</template>

<script>
import { UPDATE_CARD } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    onSave: {
      type: [Function]
    },

    idVal: {
      type: [Number]
    },
    cardVal: {
      type: [Number]
    },
    notesVal: {
      type: [String]
    },
    boxVal: {
      type: [String]
    },
    boxIdVal: {
      type: [Number]
    }
  },
  data: () => ({
    dialog: false,
    valid: true,

    id: "",
    card: "",
    box: "",
    box_id: "",
    notes: "",

    fieldRules: {
      card: [
        v => !!v || "Card is required",
        v => !!Number(v) > 0 || "Card must be a number greater than 0"
      ]
    }
  }),
  created() {
    this.id = this.idVal;
    this.card = this.cardVal;
    this.notes = this.notesVal;
    this.box = this.boxVal;
    this.box_id = this.boxIdVal;
  },
  methods: {
    async updateCard() {
      const valid = this.$refs.cardsForm.validate();
      if (!valid) return false;

      const confirm = await this.$confirm(
        "<p class='pa-2'>Are you sure you want to update this location card? </p>",
        {
          title: " Are you sure?"
        }
      );

      if (confirm) {
        const { id, card, box, box_id, notes } = this;

        try {
          const { result } = await this.$store.dispatch(
            `locations/${UPDATE_CARD}`,
            { id, card, box_id, notes }
          );

          if (result.affectedRows == 1) {
            //saved
            this.$toastr.s(`${box}-${card} was updated!`);
            this.$store.commit(
              `api/${UPDATE_API_STATUS}`,
              `Card #: ${box}-${card} | UPDATED!`
            );

            //clear first,last,Notes
            this.clearForm();
            this.dialog = false;
            this.onSave();
          }
        } catch (e) {
          this.$toastr.e(`An Error has occured: ${e}`);
        }
      }
      return false;
    },

    //
    //
    async createSingleCard() {
      const { firstCard, selectedBox, notes } = this;
      const message = `<h3 class="text-center py-3">Create a Single Card?</h3>
      <p>Card #: ${selectedBox.box}-${firstCard}</p>`;

      const confirm = await this.$confirm(message, {
        title: " Are you sure?"
      });

      if (confirm) {
        const box_id = selectedBox.id;
        const card = firstCard;
        const params = { box_id, card, notes };

        try {
          const { result } = await this.$store.dispatch(
            `locations/${CREATE_CARD}`,
            params
          );

          if (result.affectedRows == 1) {
            //saved
            this.$toastr.s(`${selectedBox.box}-${card} was saved!`);
            this.$store.commit(
              `api/${UPDATE_API_STATUS}`,
              `Card #: ${selectedBox.box}-${card} | SAVED!`
            );

            //clear first,last,Notes
            this.clearForm();
            this.dialog = false;
            this.onSave();
          }
        } catch (e) {
          this.$toastr.e(`An Error has occured: ${e}`);
        }
      }
      return false;
    },

    /**
     * clearForm clears the values used in forms, its does not clear the selectedBox data
     * @return null
     */
    clearForm() {
      this.card = "";
      this.notes = "";
      this.id = "";
      this.fullLocation = "";
    },

    /**
     * cancelUpdate clears the form and closes the dialog box, again does not clear the selectedBox data
     * @return null
     */
    cancelUpdate() {
      this.clearForm();
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
