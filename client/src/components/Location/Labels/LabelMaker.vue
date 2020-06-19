<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card raised>
        <v-card-title class="pb-1 pl-3 pt-2 primary text--white textShadow">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="d-flex align-center ">
              <i class="fa fa-cube mr-1"></i>Create Labels
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
            class="d-flex justify-space-between align-center warning white--text textShadow mb-2"
          >
            <div class="d-flex justify-space-between align-center">
              <h2 class="ma-2 py-3">
                Selected Box:
              </h2>
            </div>
            <div class="d-flex justify-space-between align-center">
              <h1 class="ma-2 py-3 text-shadow">
                {{ selectedBox.box }}
              </h1>
            </div>
          </div>

          <v-select
            v-model="firstCard"
            :items="formattedCardsFirstToLast"
            filled
            label="Select Starting Card"
          >
          </v-select>

          <h2 class="text-center ma-0 mb-5">Through To</h2>

          <v-select
            v-model="lastCard"
            :items="formattedCardsLastToFirst"
            filled
            label="Select Ending Card"
          >
          </v-select>
        </v-card-text>

        <v-divider class="mb-3"></v-divider>

        <v-card-actions>
          <div class="d-flex justify-space-between w-100">
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="red" @click="cancelLabels">
                <v-icon class="mr-1" small>fa-undo</v-icon>Cancel
              </v-btn>
            </div>
            <div class="d-flex align-center justify-center mx-3">
              <v-btn class="success" @click="createLabels">
                <v-icon class="mr-1" small>fa-save</v-icon>Create
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
          ><v-icon color="white" small class="mr-1">fa-print</v-icon> Labels
        </v-btn>
      </template>
      <span><i class="fa fa-info-circle mr-1"></i>Create Card Labels </span>
    </v-tooltip>
  </div>
</template>

<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: {
    selectedBox: [Boolean, Object],
    boxCards: [Boolean, Array]
  },
  data: () => ({
    dialog: false,
    firstCard: false,
    lastCard: false
  }),
  computed: {
    //
    //
    formattedCardsFirstToLast() {
      const cards = this.boxCards
        .map(card => {
          return { text: card.full_location, value: card.card };
        })
        .sort((a, b) => {
          return a.value - b.value;
        });
      return cards;
    },
    //
    //
    formattedCardsLastToFirst() {
      const cards = this.boxCards
        .map(card => {
          return { text: card.full_location, value: card.card };
        })
        .sort((a, b) => {
          return b.value - a.value;
        });
      return cards;
    }
  },
  methods: {
    createLabels() {
      const { firstCard, lastCard, selectedBox } = this;
      const labels = [];
      for (let x = firstCard; x <= lastCard; x++) {
        //labels.push(`${selectedBox.box}-${x}`);
        labels.push({ box: selectedBox.box, card: x });
      }

      this.createPDF(labels);
    },
    createPDF(labels) {
      //
      function createLabelsContentTabular(labels) {
        const labelCount = labels.length - 1;
        const formattedLabels = labels.map((label, i) => {
          const boxFontSize = label.box.length < 30 ? 16 : 12;

          const row = {
            layout: "noBorders",
            table: {
              widths: [120, 40],
              heights: [90, 90],
              body: [
                [
                  {
                    text: `${label.box}-`,
                    alignment: "center",
                    fontSize: boxFontSize
                  },
                  { text: label.card, alignment: "center", fontSize: 26 }
                ]
              ]
            }
          };
          return row;
        });
        return formattedLabels;
      }

      //main method handling
      var dd = {
        pageSize: {
          width: 180,
          height: 72
        },
        pageMargins: [5, 5, 5, 5],
        content: createLabelsContentTabular(labels)
      };
      pdfMake.createPdf(dd).open();
    },
    cancelLabels() {
      this.dialog = false;
    },
    cancelCreate() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
