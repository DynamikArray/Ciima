<template>
  <v-container fluid class="pa-0 h-100" style="min-height:100%">
    <v-row no-gutters>
      <v-col class="px-3 pt-3">
        <h2><v-icon small class="mr-1 mb-1">fa fab fa-tools</v-icon>Tools:</h2>
        <v-divider />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col sm="6" lg="4" class="text-center">
        <v-card class="ma-5 green">
          <v-card-title>
            <h4 class="subtitle">
              <v-icon class="mr-2">fa fa-funnel-dollar</v-icon>
              Pricing Service (Per Comic Price)
            </h4>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-3" />
            <div class="subtitle-1">
              Service to handle unstocking items as they meet a Per Comic Price. Query existing items with extended Per Comic
              Price metrics and perform needed unstocking actions.
            </div>
            <v-btn :to="{ name: 'pricingService' }" class="ma-3" color="primary">
              <v-icon class="mr-2">fa fa-funnel-dollar</v-icon>Pricing Service
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="6" lg="4" class="text-center">
        <v-card class="ma-5 green">
          <v-card-title>
            <h4 class="subtitle">
              <v-icon class="mr-2">fa fa-donate</v-icon>
              Repricing Service (Automated Relist)
            </h4>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-3" />
            <div class="subtitle-1">
              Service to handle repricing items as they are relisted each night. View repriced and needed to be repriced, as
              well as log.
            </div>
            <v-btn :to="{ name: 'repricer' }" class="ma-3" color="primary">
              <v-icon class="mr-2">fa fa-donate</v-icon>Repricing Service
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="6" lg="4" class="text-center">
        <v-card class="ma-5 green">
          <v-card-title>
            <h4 class="subtitle">
              <v-icon class="mr-2">fa fa-history</v-icon>
              Audit Log
            </h4>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-3" />
            <div class="subtitle-1">Look at system logs of user actions</div>
            <v-btn :to="{ name: 'audit' }" class="ma-3" color="primary">
              <v-icon class="mr-2">fa fa-history</v-icon>Audit Log
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col class="px-3 pt-3">
        <h2><v-icon small class="mr-1 mb-1">fa fas fa-archive</v-icon>Archived Tools:</h2>
        <v-divider />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col sm="6" lg="4" class="text-center">
        <v-card class="ma-5 blue grey darken-1">
          <v-card-title>
            <h5 class="subtitle">
              <v-icon class="mr-2">fas fa-wrench</v-icon>
              Price Sync
            </h5>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-3" />
            <div class="subtitle-1">Sync Prices Across Linnworks/Ebay</div>
            <v-btn :to="{ name: 'pricesync' }" class="ma-3" color="primary">
              <v-icon class="mr-2">fas fa-wrench</v-icon>Price Sync
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="12" lg="4" class="text-center">
        <v-card class="ma-5 grey darken-1">
          <v-card-title>
            <h5 class="subtitle">
              <v-icon class="mr-2">fa fa-project-diagram</v-icon>
              Price Matching Tools
            </h5>
          </v-card-title>

          <v-card-text>
            <v-divider class="mb-3" />
            <div class="subtitle-1">
              Match Our Titles to Competitors with Prices
            </div>
            <v-btn to="pricematch" class="ma-3" color="primary">
              <v-icon class="mr-2">fa fa-project-diagram</v-icon>Price Matcher
            </v-btn>
            <v-divider class="my-3" />
            <div class="subtitle-1">
              View Matched Title and Prices we have saved
            </div>

            <v-btn to="pricelist" class="ma-3" color="primary">
              <v-icon class="mr-2"> fa fa-comment-dollar</v-icon>Saved Prices List
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col sm="6" lg="4" class="text-center"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {}
};
</script>

<style scoped></style>
