<template>
  <div class="w-100">
    <v-data-table
      id="boxesTable"
      :loading="loading"
      :headers="headers"
      :items-per-page="5"
      :items="boxes"
      class="elevation-1 px-2"
      @click:row="selectBox"
    >
      <template v-slot:top>
        <div class="d-flex justify-space-between">
          <div class="d-flex justify-align-center align-center grow ml-3">
            <h2 class="text-left pt-2 w-100">
              <i class="fa fa-cube mr-1"></i>Location Boxes
            </h2>
          </div>
          <div class="d-flex justify-align-center align-top mt-3 mr-3">
            <CreateBoxDialog :selectedBox.sync="selectedBox"></CreateBoxDialog>
          </div>
        </div>

        <v-divider class="mb-3"></v-divider>

        <div class="d-flex justify-center">
          <div class="d-flex align-center grow">
            <v-card class="mx-4 mb-4  pa-2 grey darken-2 w-100" elevation="0">
              <v-card-title class="px-0 py-0">
                <v-form @submit.prevent="searchBoxes" class="w-100">
                  <v-text-field
                    autocomplete="off"
                    v-model="search"
                    label="Search All Boxes"
                    prepend-icon="fa-search"
                    single-line
                    hide-details
                    class="mb-1 mx-3 pt-0 mb-3"
                    @input="searchBoxes"
                    @click:clear="loadBoxes"
                    clearable
                  ></v-text-field>

                  <v-select
                    autocomplete="off"
                    dense
                    v-model="box_type"
                    :items="box_types"
                    name="Box Type"
                    label="Box Type"
                    class="mb-1 mx-3 pt-0"
                    single-line
                    filled
                    hide-details
                    placeholder="Box Type"
                    @change="onBoxTypeChange"
                  ></v-select>
                </v-form>
              </v-card-title>
            </v-card>
          </div>

          <div class="d-flex align-center">
            <div class="d-flex flex-column justify-center align-center">
              <div class="justify-center align-center">
                <v-btn
                  style="min-width:20px;"
                  @click="refreshBoxes"
                  color="info"
                  class="pa-2"
                  ><v-icon small class="mx-2">fa-sync</v-icon>
                </v-btn>
              </div>
              <div class="justify-center align-center overline">
                <div class="text-center mt-1" style="line-height:1.2">
                  Refresh<br />Boxes
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
                  @click="selectBox(item)"
                  ><v-icon color="white" small>fa-arrow-circle-right</v-icon>
                </v-btn>
              </template>
              <span
                ><i class="fa fa-info-circle mr-1"></i>Select Box and Load all
                of its Cards
              </span>
            </v-tooltip>
          </div>
        </div>
      </template>

      <template v-slot:item.box_type="{ item }">
        <div
          v-ripple="{ center: true }"
          class="d-flex flex-column justify-center align-start w-100 h-100 onHover"
        >
          {{ item.box_type }}
        </div>
      </template>

      <template v-slot:item.box="{ item }">
        <div
          v-ripple="{ center: true }"
          class="d-flex flex-column justify-center align-start w-100 h-100 onHover"
        >
          {{ item.box }}
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
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex justify-center align-center ml-3 mr-2">
            <UpdateBoxDialog
              :idValue="item.id"
              :boxValue="item.box"
              :boxTypeValue="item.box_type"
              :notesValue="item.notes"
            ></UpdateBoxDialog>
          </div>
          <div class="d-flex justify-center align-center ml-2 mr-5">
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
              <span
                ><i class="fa fa-info-circle mr-1"></i>Delete a Box and all it's
                cards
              </span>
            </v-tooltip>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { headers } from "./tableConfig.js";
import debounce from "lodash.debounce";
import {
  SEARCH_BOXES,
  SEARCH_CARDS,
  DELETE_BOX,
  SET_SELECTED_BOX
} from "@/store/action-types";

import CreateBoxDialog from "./CreateBoxDialog.vue";
import UpdateBoxDialog from "./UpdateBoxDialog.vue";

import { box_types } from "./box_types.js";

export default {
  components: {
    CreateBoxDialog,
    UpdateBoxDialog
  },
  created() {
    this.box_types = [{ text: "All Box Types", value: "" }, ...this.box_types];
  },
  data: () => ({
    headers,
    search: "",
    box_type: "",
    box_types
  }),
  props: {
    boxes: {
      type: [Array, Boolean]
    },
    loading: {
      type: [Boolean]
    },
    selectedBox: {
      type: [Object, Boolean],
      default: { box: "", id: "" }
    }
  },

  methods: {
    onBoxTypeChange() {
      this.executeSearch();
    },
    //
    //
    refreshBoxes() {
      this.box_type = "";
      this.loadBoxes();
    },
    //
    loadBoxes() {
      this.executeSearch();
      //this.$store.dispatch(`locations/${SEARCH_BOXES}`);
    },
    //
    //
    searchBoxes: debounce(function(search) {
      this.executeSearch();
    }, 500),
    //
    //
    executeSearch() {
      const search = this.search || "";
      const box_type = this.box_type || "";

      //greater than 3 so auto search
      this.$store.dispatch(`locations/${SEARCH_BOXES}`, {
        search,
        box_type
      });
    },

    //
    //
    selectBox(item, row) {
      this.$store.dispatch(`locations/${SET_SELECTED_BOX}`, {
        box: item.box,
        id: item.id,
        box_type: item.box_type
      });

      this.$store.dispatch(`locations/${SEARCH_CARDS}`, {
        box_id: item.id,
        box: item.box
      });
    },

    async confirmDelete(item) {
      const { id } = item;
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete this box?</h3>
        <p>This will delete this box and all its cards, it cannot be undone.</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.deleteBox(id);
    },

    //
    //
    async deleteBox(id) {
      try {
        const { result } = await this.$store.dispatch(
          `locations/${DELETE_BOX}`,
          { id }
        );
        //check result
        if (result.affectedRows == 1) {
          //saved ok
          this.$toastr.s("Box Deleted!");
          //close dialog
          this.dialog = false;
          //reload boxes
          this.$store.dispatch(`locations/${SEARCH_BOXES}`);
        } else {
          this.$toastr.e("Box not deleted, no error reported.");
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
#boxesTable .v-data-table-header th {
  height: 30px;
  padding: 0px 0px 8px 8px !important;
}
#boxesTable .v-data-table__wrapper tr td {
  padding: 0px 0px;
}

#boxesTable .v-data-footer__select .v-select {
  margin: 0px 0px 8px 12px !important;
}
</style>
