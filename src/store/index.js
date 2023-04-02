import Vue from "vue";
import Vuex from "vuex";
import { set } from "@/utils/vuex";
import functions from "@/utils/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: null,
    routes: null,
    route: null,
    routeFrom: null,
    pages: null,
    page: null,
    groups: null,
    group: null,
    tiles: null,
    tile: null,
    tab: null,
    show: true,
  },
  mutations: {
    setTheme: set("theme"),
    setRoutes: set("routes"),
    setRoute: set("route"),
    setRouteFrom: set("routeFrom"),
    setPages: set("pages"),
    setPage: set("page"),
    setGroups: set("groups"),
    setGroup: set("group"),
    setTiles: set("tiles"),
    setTile: set("tile"),
    setTab: set("tab"),
    setShow: set("show"),
  },
  getters: {
    footerItems: (state) => {
      if(!state.tiles) return;
      return state.tiles.filter(e=>e.DisplayInFooter === 1);
    },
    viewGroup: (state) => {
      if(!state.groups) return;
      if(!state.route.params) return;
      if(state.route.params.ID){
        return state.groups.find(e=>e.ID === state.route.params.ID);
      } else {
        return state.groups.find(e=>e.Name === state.route.params.Name);
      }
    },
    viewTiles: (state,getters) => {
      if(!state.tiles) return;
      if(!getters.viewGroup) return;
      let groups = state.groups.filter(e=>e.ParentID === getters.viewGroup.ID);
      let tiles = state.tiles.filter(e=>e.ParentID === getters.viewGroup.ID);
      return groups.concat(tiles);
    },
    viewParent: (state,getters) => {
      if(!state.tiles) return;
      if(!getters.viewGroup) return;
      let tiles = state.tiles.filter(e=>e.ID === getters.viewGroup.ParentID);
      let groups = state.groups.filter(e=>e.ID === getters.viewGroup.ParentID);
      let arr = tiles.concat(groups);
      if(arr.length > 0){
        return arr[0];
      } else {
        return null;
      }
    },
  },
  actions: {
    setGlobalTheme: function ({commit},data) {
      commit('setShow',false);
      console.log(data);
       setTimeout(() => {
         commit('setShow',true);
       }, 100);
    },
    toggleTheme: function () {
      document.querySelector("#app").__vue__.$vuetify.theme.isDark = !document.querySelector("#app").__vue__.$vuetify.theme.isDark;
    },
    getPages: function ({ commit }) {
      let res = functions.getPages();
      res.then((r) => {
        commit("setPages", r);
        commit(
          "setPage",
          r.find((e) => e.DefaultWorkspace === 1)
        );
      });
    },
    getGroupsByPageParentId: function ({ commit, state }) {
      let res = functions.getGroupsByPageParentId(state.page.ID);
      res.then((r) => {
        commit("setGroups", r);
      });
    },
    getTilesByPageParentId: function ({ commit, state }) {
      let res = functions.getTilesByPageParentId(state.page.ID);
      res.then((r) => {
        commit("setTiles", r);
      });
    },
  },
  modules: {},
});
