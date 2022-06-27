import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("leadhit-site-id"),
  },
  getters: {},
  mutations: {
    logIn(state, siteId) {
      localStorage.setItem("leadhit-site-id", siteId);
      state.isLoggedIn = true;
    },
    logOut(state) {
      localStorage.removeItem("leadhit-site-id");
      state.isLoggedIn = false;
    },
  },
  actions: {},
  modules: {},
});
