<template>
  <div class="w-100 ">
    <v-data-table
      id="cardsTable"
      :loading="loading"
      :headers="headers"
      :items-per-page="5"
      :items="cards"
      class="elevation-1 px-0"
      @click:row="selectCard"
    >
      <template v-slot:top>
        <div
          class="d-flex justify-space-between align-center"
          :class="selectedBox.box ? 'primary darken-1 textShadow' : ''"
        >
          <div class="d-flex justify-center align-center">
            <div
              v-if="selectedBox.box"
              class="d-flex align-center justify-start pa-3"
            >
              <h4
                class="caption-1 text-center ma-0 mr-1 pa-1"
                style="line-height:1.2"
              >
                Selected Box:
              </h4>
              <h2 class="text-left pt-2 w-100">{{ selectedBox.box }}</h2>
            </div>
            <div v-else class="ml-3">
              <h2 class="pt-2">
                <i class="fa fa-sd-card mr-1"></i>Location Cards
              </h2>
            </div>
          </div>
          <div class="d-flex justify-center align-center mt-2 mr-2">
            <CreateCardDialog
              :onSave="searchCards"
              :box="currentBox"
            ></CreateCardDialog>
          </div>
        </div>

        <v-divider class="mb-3"></v-divider>

        <div class="d-flex justify-center">
          <div class="d-flex align-center grow">
            <v-card class="mx-4 mb-4  pa-2 grey darken-2 w-100" elevation="0">
              <v-card-title class="px-0 py-0">
                <v-form @submit.prevent="searchCards" class="w-100">
                  <v-text-field
                    v-model="search"
                    label="Search All Cards"
                    prepend-icon="fa-search"
                    single-line
                    hide-details
                    class="mb-1 mx-3 pt-0"
                    @input="searchCards"
                    @click:clear="loadCards"
                    clearable
                  ></v-text-field>
                </v-form>
              </v-card-title>
            </v-card>
          </div>

          <div class="d-flex align-center">
            <div class="d-flex flex-column justify-center align-center">
              <div class="justify-center align-center">
                <v-btn
                  style="min-width:20px;"
                  @click="loadCards"
                  color="info"
                  class="pa-2"
                  ><v-icon small class="mx-2">fa-sync</v-icon>
                </v-btn>
              </div>
              <div class="justify-center align-center overline">
                <div class="text-center mt-1" style="line-height:1.2">
                  Refresh<br />Cards
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.loadAction="{ item }">
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex justify-center align-center ml-4">
            <v-tooltip top color="grey lighten-2 black--text">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  style="min-width:20px;"
                  class="px-3"
                  color="primary"
                  @click="selectCard(item)"
                  ><v-icon color="white" small>fa-arrow-circle-down</v-icon>
                </v-btn>
              </template>
              <span
                ><i class="fa fa-info-circle mr-1"></i>Select Card and load all
                of its products
              </span>
            </v-tooltip>
          </div>
        </div>
      </template>

      <template v-slot:item.card="{ item }">
        <div
          v-ripple="{ center: true }"
          class="d-flex flex-column justify-center align-start w-100 h-100 onHover"
        >
          {{ item.card }}
        </div>
      </template>

      <template v-slot:item.full_location="{ item }">
        <div
          v-ripple="{ center: true }"
          class="d-flex flex-column justify-center align-start w-100 h-100 onHover"
        >
          {{ item.full_location }}
        </div>
      </template>

      <template v-slot:item.notes="{ item }">
        <div v-if="item.notes">
          <v-tooltip top color="grey lighten-2 black--text" max-width="520">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" color="white" small class="mr-1"
                >fa-comment</v-icon
              >
            </template>
            <div class="">
              <h4>Notes:</h4>
              <p class="mb-1">
                {{ item.notes }}
              </p>
            </div>
          </v-tooltip>
        </div>
        <div v-else>
          &nbsp;
        </div>
      </template>

      <template v-slot:item.dateCreated="{ item }">
        <div
          v-ripple="{ center: true }"
          class="d-flex flex-column justify-center align-start w-100 h-100 onHover"
        >
          <span style="font-size: 85%">{{ item.dateCreated | dateTime }}</span>
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-center align-center">
          <div class="d-flex justify-center align-center mx-1">
            <UpdateCardDialog
              :idVal="item.id"
              :cardVal="item.card"
              :notesVal="item.notes"
              :boxVal="item.box"
              :boxIdVal="item.box_id"
              :onSave="searchCards"
            ></UpdateCardDialog>
          </div>
          <div class="d-flex justify-center align-center mx-1">
            <v-tooltip top color="grey lighten-2 black--text">
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  style="min-width:20px;"
                  class="px-3"
                  color="red"
                  @click="confirmDelete(item)"
                  ><v-icon color="white" small>fa-trash</v-icon>
                </v-btn>
              </template>
              <span><i class="fa fa-info-circle mr-1"></i>Delete a Card </span>
            </v-tooltip>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
/*

<UpdateCardDialog
  :idValue="item.id"
  :boxValue="item.box"
  :notesValue="item.notes"
></UpdateCardDialog>
 */

import {
  SEARCH_CARDS,
  DELETE_CARD,
  SET_SELECTED_CARD
} from "@/store/action-types.js";
import { UPDATE_API_STATUS } from "@/store/mutation-types.js";

import { headers } from "./tableConfig.js";
import debounce from "lodash.debounce";

import CreateCardDialog from "./CreateCardDialog.vue";
import UpdateCardDialog from "./UpdateCardDialog.vue";

export default {
  components: {
    CreateCardDialog,
    UpdateCardDialog
  },
  data: () => ({
    headers,
    search: "",
    currentBox: false
  }),
  props: {
    cards: {
      type: [Array, Boolean]
    },
    loading: {
      type: [Boolean]
    },
    selectedBox: {
      type: [Object, Boolean]
    },
    selectedCard: {
      type: [Object, Boolean]
    }
  },
  watch: {
    selectedBox: function(val) {
      this.currentBox = val;
      this.search = val.box;
    }
  },
  methods: {
    searchCards: debounce(function() {
      this.$store.dispatch(`locations/${SEARCH_CARDS}`, {
        search: this.search
      });
    }, 500),
    //
    //
    loadCards() {
      this.$store.dispatch(`locations/${SEARCH_CARDS}`, {
        search: this.search
      });
    },
    //
    //

    selectCard(item) {
      this.$store.dispatch(`locations/${SET_SELECTED_CARD}`, {
        card: item.card,
        id: item.id
      });
    },

    async confirmDelete(item) {
      const { id } = item;
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete this card?</h3>
        <p>This will delete this cards, it cannot be undone.</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.deleteCard(id, item.full_location);
    },

    //
    //
    async deleteCard(id, fullLocation) {
      try {
        const { result } = await this.$store.dispatch(
          `locations/${DELETE_CARD}`,
          { id }
        );
        //check result
        if (result.affectedRows == 1) {
          //saved ok
          this.$toastr.s("Card Deleted!");
          //close dialog
          this.dialog = false;
          //reload boxes
          this.$store.dispatch(`locations/${SEARCH_CARDS}`);
          this.$store.commit(
            `api/${UPDATE_API_STATUS}`,
            `Card #: ${fullLocation} | DELETED!`
          );
        } else {
          this.$toastr.e("Card not deleted, no error reported.");
        }
      } catch (e) {
        this.$toastr.e(`An Error has occured: ${e}`);
      }
    }
  }
};
</script>

<style scoped>
.onHover {
  cursor: pointer;
}
</style>
<style>
.v-data-table-header__icon {
  margin-left: 5px;
}
#cardsTable .v-data-table-header th {
  height: 30px;
  padding: 0px 0px 8px 0px !important;
}
#cardsTable .v-data-table__wrapper tr td {
  padding: 0px 0px;
}

#cardsTable .v-data-footer__select .v-select {
  margin: 0px 0px 8px 12px !important;
}
</style>
