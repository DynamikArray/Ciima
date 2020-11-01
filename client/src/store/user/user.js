import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { axiosInstance, createInterceptor } from "@/util/axios/axiosInstance";
import router from "@/router/router";

import { getField, updateField } from "vuex-map-fields";

import { UPDATE_API_STATUS } from "@/store/mutation-types";

const user = {
  namespaced: true,
  state: {
    status: "",
    errMsg: false,
    token: localStorage.getItem("token") || "",
    user: false
  },
  getters: {
    getField,

    isLoggedIn: state => {
      if (state.user) return true;
      return false;
    },
    token: state => state.token,
    user: state => state.user,
    authStatus: state => state.status,
    authError: state => state.errMsg,
    userName: state => state.user.username,
    displayName: state => state.user.displayname,
    displayColor: state => state.user.displaycolor,
    email: state => state.user.email
  },
  mutations: {
    updateField,

    auth_request(state) {
      state.status = "loading";
      state.errMsg = false;
    },
    auth_success(state, user) {
      state.status = "success";
      state.errMsg = false;
      state.token = user.token;
      state.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        displayname: user.displayname,
        displaycolor: user.displaycolor
      };
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
    updateUser({ dispatch, commit }, params) {
      return dispatch(
        "api/requestHandler",
        {
          method: "post",
          url: "/user/update",
          params: params,
          success: false,
          loading: false
        },
        { root: true }
      );
    },

    loginCheck({ dispatch, commit }, options) {
      return new Promise(async (resolve, reject) => {
        let { user, token } = this.state;
        //see if we have a full user object on state?
        if (user && token && token.length > 1) resolve(true);
        //if (this.state.user) resolve(true);

        //No user but do we have token
        token = localStorage.getItem("token");
        if (token) {
          //do we have a token?
          const userResp = await axiosInstance({
            ...axiosInstance.defaults,
            url: "/user/account",
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
          }).catch(e => {
            if (e.response && e.response.status === 401)
              console.log("You are not logged in!");
          });

          if (userResp && userResp.data) {
            const {
              id,
              username,
              email,
              displayname,
              displaycolor
            } = userResp.data;
            commit("auth_success", {
              id,
              username,
              email,
              displayname,
              displaycolor
            });

            dispatch(
              `api/updateStatus`,
              { msg: `Logged in user ${username}` },
              {
                root: true
              }
            );

            resolve(true);
          }
        }
        //if we get here, reject it
        reject();
      });
    },

    //
    //
    //
    register({ dispatch, commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axiosInstance({
          ...axiosInstance.defaults,
          url: "/user/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const {
              id,
              username,
              displayname,
              displaycolor,
              email,
              token
            } = resp.data;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            commit("auth_success", {
              id,
              username,
              displayname,
              displaycolor,
              email,
              token
            });
            dispatch(`api/updateStatus`, `Logged in user ${username}`, {
              root: true
            });
            resolve(resp);
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
    login({ dispatch, commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axiosInstance({
          ...axiosInstance.defaults,
          url: "/user/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const {
              id,
              username,
              displayname,
              displaycolor,
              email,
              token
            } = resp.data;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            commit("auth_success", {
              id,
              username,
              displayname,
              displaycolor,
              email,
              token
            });
            dispatch(`api/updateStatus`, `Logged in user ${username}`, {
              root: true
            });
            resolve(resp);
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
    account({ dispatch, commit }, user) {
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
            const {
              id,
              username,
              displayname,
              displaycolor,
              email
            } = resp.data;
            commit("auth_success", {
              id,
              username,
              displayname,
              displaycolor,
              email
            });
            dispatch(`api/updateStatus`, `Logged in user ${username}`, {
              root: true
            });
            resolve(resp);
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

        router.push("/login").catch(err => {
          if (!err.name === "NavigationDuplicated") console.log(err);
        });
        resolve();
      });
    }
  }
};

export default user;
