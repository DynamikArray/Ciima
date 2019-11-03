<template>
  <v-card raised hover>
    <v-card-title class="mb-1"
      ><h4 class="mb-0">
        <v-icon class="mr-1 mb-1">fa-sign-in-alt</v-icon>Please Sign In to
        continue
      </h4></v-card-title
    >
    <v-divider class="my-1"></v-divider>
    <v-card-text>
      <v-alert type="error" dense v-if="authError">{{ authError }}</v-alert>
      <v-form ref="loginForm" @submit="signInUser" v-model="valid">
        <v-text-field
          autocomplete="current-username"
          label="Username"
          name="username"
          v-model="username"
          outlined
          hint="Username"
          placeholder="Username"
          prepend-inner-icon="fa-user"
          :rules="fieldRules.username"
        >
        </v-text-field>
        <v-text-field
          autocomplete="current-password"
          type="password"
          label="Password"
          name="password"
          v-model="password"
          outlined
          hint="Password"
          placeholder="Password"
          prepend-inner-icon="fa-key"
          v-on:keyup.enter="handleEnterKeyPress"
          :rules="fieldRules.password"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex justify-space-between w-100">
        <div class="d-flex align-center">
          <v-btn color="red" @click="cancelSignIn"
            ><v-icon class="mr-1">fa-times-circle</v-icon>Cancel</v-btn
          >
        </div>
        <div class="d-flex align-center">
          <v-btn color="primary" type="submit" @click="signInUser"
            ><v-icon class="mr-1">fa-sign-in-alt</v-icon>Sign In</v-btn
          >
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      valid: true,
      fieldRules: {
        username: [v => !!v || "Username is a required field"],
        password: [v => !!v || "Password is a required field"]
      }
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push("/").catch(err => {
        if (!err.name === "NavigationDuplicated") console.log(err);
      });
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      authError: "user/authError"
    })
  },
  methods: {
    handleEnterKeyPress() {
      //if we validate the form then
      this.signInUser();
    },

    async signInUser() {
      if (!this.$refs.loginForm.validate()) return false;
      const { username, password } = this;
      try {
        await this.$store.dispatch("user/login", { username, password });

        this.$router.push("/").catch(err => {
          if (!err.name === "NavigationDuplicated") console.log(err);
        });
      } catch (err) {
        if (!err.response.status === 403) {
          this.$toastr.e(err.message);
          //we need to log these somewhere somehow?
        }
      }
    },

    cancelSignIn() {
      this.username = "";
      this.password = "";
      this.valid = true;

      this.$store.commit("user/logout"); //clear all auth status/msgs
      this.$router.push("/").catch(err => {
        if (!err.name === "NavigationDuplicated") console.log(err);
      });
    }
  }
};
</script>

<style scoped></style>
