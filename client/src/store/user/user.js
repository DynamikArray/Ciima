import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { axiosInstance, createInterceptor } from "@/util/axios/axiosInstance";
import router from "@/router/router";

import { UPDATE_API_STATUS } from "@/store/mutation-types";

const handleResponse = (commit, resolve, resp) => {
  const { id, username, email, token } = resp.data;
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  commit("auth_success", { id, username, email, token });
  commit(`api/${UPDATE_API_STATUS}`, `Logged in user ${username}`, {
    root: true
  });
  resolve(resp);
};

const user = {
  namespaced: true,
  state: {
    status: "",
    errMsg: false,
    token: localStorage.getItem("token") || "",
    user: false
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    authStatus: state => state.status,
    authError: state => state.errMsg,
    userName: state => state.user.username,
    email: state => state.user.email
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
      state.errMsg = false;
    },
    auth_success(state, user) {
      state.status = "success";
      state.errMsg = false;
      state.token = user.token;
      state.user = { id: user.id, username: user.username, email: user.email };
    },
    auth_error(state, errMsg = false) {
      state.status = "error";
      state.errMsg = errMsg;
    },
    logout(state) {
      state.status = "";
      state.errMsg = false;
      state.token = "";
      state.user = false;
    }
  },
  actions: {
    //
    //
    //
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axiosInstance({
          ...axiosInstance.defaults,
          url: "/user/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            handleResponse(commit, resolve, resp);
          })
          .catch(err => {
            const { response, message } = err;
            if (response.status === 403) {
              commit("auth_error", response.data);
            } else {
              commit("auth_error", message);
            }
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    //
    //
    //
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axiosInstance({
          ...axiosInstance.defaults,
          url: "/user/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            handleResponse(commit, resolve, resp);
          })
          .catch(err => {
            const { response, message } = err;
            if (response.status === 403) {
              commit("auth_error", response.data);
            } else {
              commit("auth_error", message);
            }
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    //
    //
    //
    account({ commit }, user) {
      const { expired } = createInterceptor(() => {
        commit("user/logout", false, { root: true });
      });
      axiosInstance.interceptors.response.use(undefined, expired);

      return new Promise((resolve, reject) => {
        commit("auth_request");
        axiosInstance({
          ...axiosInstance.defaults,
          url: "/user/account",
          data: user,
          method: "POST"
        })
          .then(resp => {
            handleResponse(commit, resolve, resp);
          })
          .catch(err => {
            const { response, message } = err;
            if (response.status === 403) {
              commit("auth_error", response.data);
            } else {
              commit("auth_error", message);
            }
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    //
    //
    //
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common["Authorization"];
        this.$router.push("/login").catch(err => {
          if (!err.name === "NavigationDuplicated") console.log(err);
        });
        resolve();
      });
    }
  }
};

export default user;
