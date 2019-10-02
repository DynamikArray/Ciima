import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { axiosInstance, createInterceptor } from "@/util/axios/axiosInstance";
import router from "@/router/router";

import {} from "@/store/mutation-types";

const user = {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: false
  },
  getters: {
    isLoggedIn: state => !!state.token,
    user: state => state.user,
    authStatus: state => state.status,
    userName: state => state.user.username,
    email: state => state.user.email
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, user) {
      state.status = "success";
      state.token = user.token;
      state.user = { id: user.id, username: user.username, email: user.email };
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
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
            const { id, username, email, token } = resp.data;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            commit("auth_success", { id, username, email, token });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
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
            const { id, username, email, token } = resp.data;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            commit("auth_success", { id, username, email, token });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
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
            const { id, username, email, token } = resp.data;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            commit("auth_success", { id, username, email, token });
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            commit("auth_error");
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
        router.push("/login");
        resolve();
      });
    }
  }
};

export default user;
