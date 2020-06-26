<template>
  <div>
    <v-dialog v-model="dialog" max-width="620px">
      <v-card>
        <v-card-title class="pb-1 pl-3 pt-2 primary text--white textShadow">
          <div class="d-flex justify-space-between align-center w-100 ">
            <div class="d-flex align-center ">
              <i class="fa fa-sd-card mr-1"></i>Create New Card(s)
            </div>
            <div class="d-flex align-center">
              <v-icon small @click="cancelCreate" class="text--grey darken-2"
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
              {{ selectedBox.box }}
            </h2>
          </div>

          <v-divider class="my-2"></v-divider>

          <v-form
            ref="cardsForm"
            v-model="valid"
            lazy-validation
            class="pa-3"
            @submit.prevent="createCards"
          >
            <div class="">
              <div class="d-flex justify-space-between align-center">
                <div class="d-flex justify-center align-center shrink">
                  <div class="d-flex justify-center align-center">
                    <div class="d-flex justify-start align-center mr-4">
                      <h3>First:</h3>
                    </div>
                    <div class="d-flex justify-start align-center shrink mr-2">
                      <v-text-field
                        v-model="firstCard"
                        name="First Card #"
                        label="First Card #"
                        class=""
                        filled
                        placeholder="Card #"
                        :rules="fieldRules.firstCard"
                      >
                      </v-text-field>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-center align-center shrink">
                  <div class="d-flex justify-center align-center">
                    <div class="d-flex justify-start align-center mr-4">
                      <h3>Last:</h3>
                    </div>
                    <div class="d-flex justify-start align-center shrink">
                      <v-text-field
                        v-model="lastCard"
                        name="Last Card #"
                        label="Last Card #"
                        class=""
                        filled
                        placeholder="Card #"
                        :rules="fieldRules.lastCard"
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

        <div class="grey darken-4 px-3 py-1 mx-5 mb-3">
          <div class="caption my-1 text--white">
            <h3 class="text-center mb-1">TIPS:</h3>
            To create a single card, you need to only fill in the First Card #
            field.
          </div>
          <div class="caption my-1">
            To create a run of cards, enter the Starting card as the First Card
            #, and the Ending card as Last Card #.
          </div>
        </div>

        <v-divider class="mb-3"></v-divider>

        <v-card-actions>
          <div class="d-flex justify-space-between w-100">
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="red" @click="cancelCreate">
                <v-icon class="mr-1" small>fa-undo</v-icon>Cancel
              </v-btn>
            </div>
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="success" @click="createCards">
                <v-icon class="mr-1" small>fa-save</v-icon>Submit
              </v-btn>
            </div>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-tooltip top color="grey lighten-2 black--text">
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="!selectedBox"
          v-on="on"
          style="min-width:20px;"
          class="px-3 mb-1"
          color="success"
          @click.stop="dialog = true"
          ><v-icon color="white" small class="mr-1">fa-plus-circle</v-icon>
          Add Card(s)
        </v-btn>
      </template>
      <span><i class="fa fa-info-circle mr-1"></i>Create a new Card(s) </span>
    </v-tooltip>
  </div>
</template>

<script>
const checkLastCard = val => {
  if (val) return !!Number(val) > 0;
  return true;
};

import { CREATE_CARD, CREATE_CARDS } from "@/store/action-types";
import { UPDATE_API_STATUS } from "@/store/mutation-types";

export default {
  props: {
    onSave: {
      type: [Function]
    },
    box: {
      type: [Boolean, Object]
    }
  },
  data: () => ({
    dialog: false,
    valid: true,

    selectedBox: false,

    firstCard: "",
    lastCard: "",
    notes: "",

    //
    //

    //
    //
    fieldRules: {
      firstCard: [
        v => !!v || "First Card is required",
        v => !!Number(v) > 0 || "First Card must be a number greater than 0"
      ],
      lastCard: [
        v => checkLastCard(v) || "Last Card should be a number greater than 0"
      ]
    }
  }),
  watch: {
    box: function(val) {
      this.selectedBox = val;
    }
  },
  methods: {
    //
    //
    async createCards() {
      //validate
      const valid = this.$refs.cardsForm.validate();
      if (!valid) return false;

      const { firstCard, lastCard } = this;

      //check if this is a single or many cards
      if (lastCard.length == 0) {
        this.createSingleCard();
      }

      if (lastCard.length > 0) {
        if (Number(lastCard) <= Number(firstCard)) {
          this.$toastr.e(
            `Last Card ${lastCard} not greater than First Card ${firstCard}.`
          );
          return false;
        }
        this.createManyCards();
      }
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

    //
    //
    async createManyCards() {
      const { firstCard, lastCard, selectedBox, notes } = this;
      const totalCards = lastCard - firstCard + 1;

      const message = `<h3 class="text-center py-3">Create Many Cards?</h3>
      <p>First Card #: ${selectedBox.box}-${firstCard}</p>
      <p>Last Card #: ${selectedBox.box}-${lastCard}</p>
      <p>Total Cards: ${totalCards}</p>`;

      const confirm = await this.$confirm(message, {
        title: " Are you sure?"
      });
      if (confirm) {
        const params = {
          box_id: selectedBox.id,
          cardFirst: firstCard,
          cardLast: lastCard,
          notes
        };
        try {
          const { result } = await this.$store.dispatch(
            `locations/${CREATE_CARDS}`,
            params
          );
          if (result.affectedRows > 0) {
            //saved
            this.$toastr.s(
              `${totalCards} Cards were created in ${selectedBox.box}!`
            );
            this.$store.commit(
              `api/${UPDATE_API_STATUS}`,
              `${totalCards} were created in ${selectedBox.box}`
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
      this.firstCard = "";
      this.lastCard = "";
      this.notes = "";
    },

    /**
     * cancelCreate clears the form and closes the dialog box, again does not clear the selectedBox data
     * @return null
     */
    cancelCreate() {
      this.clearForm();
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
