<template>
  <div>
    <div :key="fieldName" class="mr-3">
      <div v-if="isSelectionOnly">
        <v-autocomplete
          :label="fieldName"
          outlined
          autocomplete="off"
          v-model="comboBoxValue"
          :id="fieldName + 'comboBox'"
          :items="hasAspectValues ? aspectValuesList : []"
          item-text="itemText"
          item-value="itemValue"
          :return-object="false"
          :placeholder="`Choose a ${fieldName} ...`"
          :search-input.sync="comboBoxSearch"
          chips
          clearable
          :mulitple="isMultiValue"
          :rules="rules"
          @change="handleChangeInput"
        />
      </div>

      <div v-if="!isSelectionOnly">
        <v-combobox
          :label="fieldName"
          outlined
          autocomplete="off"
          v-model="comboBoxValue"
          :id="fieldName + 'comboBox'"
          :items="hasAspectValues ? aspectValuesList : []"
          item-text="itemText"
          item-value="itemValue"
          :return-object="false"
          :placeholder="`Start typing a ${fieldName} ...`"
          :search-input.sync="comboBoxSearch"
          chips
          clearable
          :mulitple="isMultiValue"
          :rules="rules"
          @change="handleChangeInput"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No results matching "<b>{{ comboBoxSearch }}</b
                  >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </div>
    </div>
  </div>
</template>

<script>
/*

part of text field
counter
:rules="rules"
validate-on-blur
@blur="blur"
:error-messages="errorMessages"
*/

import { ebay as config } from "@/config/index";

export default {
  name: "AspectItems",
  props: {
    item: {
      type: [Object]
    }
  },
  data: () => ({
    fieldValue: "",
    comboBoxSearch: "",
    comboBoxValue: "",
    rules: [v => !!v || "*Required field"]
  }),
  computed: {
    fieldName() {
      return this.item.localizedAspectName;
    },
    dataType() {
      return this.item.aspectConstraint.aspectDataType;
    },
    dataMode() {
      return this.item.aspectConstraint.aspectMode;
    },
    isSelectionOnly() {
      if (this.hasAspectValues) {
        if (this.item.aspectConstraint.aspectMode == config.aspectMode.SELECTION_ONLY) return true;
      }
      return false;
    },
    isMultiValue() {
      if (this.hasAspectValues) {
        if (this.item.aspectConstraint.itemToAspectCardinality == config.aspectItems.cardinality.MULTI) return true;
      }
      return false;
    },
    dataCardinality() {
      return this.item.aspectConstraint.itemToAspectCardinality;
    },
    hasAspectValues() {
      if (this.item.aspectValues && this.item.aspectValues.length > 0) return true;
      return false;
    },
    aspectValuesCount() {
      if (this.hasAspectValues) return this.item.aspectValues.length;
      return 0;
    },
    aspectValuesList() {
      if (this.hasAspectValues) {
        return this.item.aspectValues.map(aspect => {
          return { itemText: aspect.localizedValue, itemValue: aspect.localizedValue };
        });
      }
      return [];
    }
  },
  methods: {
    handleChangeInput(val) {
      if (val) {
        this.$emit("aspectItemSelected", { key: this.fieldName, value: val });
      }
    }
  }
};
</script>

<style scoped></style>
