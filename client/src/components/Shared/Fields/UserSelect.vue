<template>
  <div class="d-flex flex-row mb-2" :class="componentClass">
    <div class="d-flex" :class="lableWrapperClass">
      <div class="mt-0 mr-2" :class="lableClass">
        <b>{{ lableText }}</b>
      </div>
    </div>

    <div class="d-flex align-center justify-end">
      <v-select style="width:240px" solo hide-details dense @change="handleSelect" :value="selectedUserId" :items="items">
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSelect",
  props: {
    componentClass: {
      type: [String],
      default: "align-center"
    },
    lableText: {
      type: [String],
      default: "User"
    },
    lableClass: [String],
    lableWrapperClass: {
      type: [String],
      default: "align-center justify-end"
    },
    selectedUserId: {
      type: [String, Number, Boolean],
      default: 0
    },
    roleToSelect: {
      type: [String, Boolean],
      default: false
    }
  },
  created() {
    let params = {};
    if (this.roleToSelect) params = { role: this.roleToSelect };
    this.$store
      .dispatch(
        "api/requestHandler",
        {
          method: "get",
          url: "/auditLog/userList",
          params: params,
          success: false,
          loading: false
        },
        { root: true }
      )
      .then(({ result }) => {
        if (result) {
          this.items = [...this.items, ...result];
        }
      });
  },
  data() {
    return {
      items: [{ text: "Select user...", value: 0 }]
    };
  },
  methods: {
    handleSelect(userId) {
      if (!userId) return false;
      const userNameItem = this.items.filter(item => item.value == userId).shift();
      const userName = userNameItem.text;

      this.$emit("userSelected", { userId, userName });
    }
  }
};
</script>

<style scoped></style>
