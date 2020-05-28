<template>
  <v-container fluid style="min-height:100%">
    <v-row>
      <v-col class="pt-0">
        <AuditLogContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuditLogContainer from "@/components/AuditLog/AuditLogContainer";

export default {
  components: {
    AuditLogContainer
  }
};
</script>

<style scoped></style>
