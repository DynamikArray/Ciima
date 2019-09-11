<template>
  <v-form class="ma-4">
    <h1 class="title">Enter Draft Details</h1>
    <v-divider class="my-3"></v-divider>

    <!--TITLE ROW-->
    <v-row>
      <v-col cols="2">
        <v-text-field
          outlined
          filled
          label="Location Code"
          hint="Location code for the item"
        ></v-text-field>
      </v-col>
      <v-col cols="10">
        <v-text-field
          outlined
          filled
          label="Inventory Title"
          hint="Title as it will appear on Ebay"
          clearable
          counter
          :rules="rules.title"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--END ROW -->

    <v-row>
      <v-col cols="6">
        <v-text-field
          outlined
          filled
          label="Ebay Site Category"
          hint="Ebays Site category for this product"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          outlined
          filled
          label="Grade"
          hint="Grade of the product"
        ></v-text-field
      ></v-col>
      <v-col cols="1">
        <v-text-field outlined filled label="Qty" hint="Quanity"></v-text-field
      ></v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          filled
          label="Price"
          hint="Price it will list for on eBay"
        ></v-text-field
      ></v-col>
    </v-row>
    <!--END ROW -->

    <v-divider class="mb-4"></v-divider>

    <!--NEXT ROW -->
    <v-row>
      <v-col cols="6">
        <v-text-field
          outlined
          filled
          label="Ebay Store Category 1"
          hint="Your Ebay store category for this product"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          outlined
          filled
          label="Ebay Store Category 2"
          hint="Secondary Ebay store category for this product"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--END ROW -->

    <v-divider class="mb-4"></v-divider>

    <!--NEXT ROW -->
    <v-row>
      <v-col cols="4">
        <v-text-field
          outlined
          filled
          label="Issue Numbers"
          hint="Issue Number(s) when applicable"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          outlined
          filled
          label="Publisher"
          hint="Main publisher of these issues"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          outlined
          filled
          label="Character"
          hint="Main character featured throughout"
        ></v-text-field>
      </v-col>
    </v-row>
    <!--END ROW -->

    <!--NEXT ROW -->
    <v-row>
      <v-col cols="4">
        <v-text-field
          outlined
          filled
          label="Series"
          hint="Storyline/Series of this product"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          filled
          label="Year"
          hint="The year published for these issues "
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          outlined
          filled
          label="Publication Date"
          hint="The Date published eg(Mar 86) "
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        title: [v => v.length <= 25 || "Max 25 characters"]
      }
    };
  },
  props: {},
  components: {}
};
</script>

<style scoped></style>
