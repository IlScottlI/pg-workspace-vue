import Vue from "vue";
import Vuex from "vuex";
import { set } from "@/utils/vuex";
import Swal from 'sweetalert2';
import { Tree } from 'vue-tree-list'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server_name: 'https://naaccscdatw10.oshkoshglobal.com',
    IgnitionTitle: 'EAM',
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
    params: null,
    show: true,
    WorkspaceID: 1,
    WorkspaceJSON: null,
    Response: null,
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
    setWorkspaceJSON: set("WorkspaceJSON"),
    setResponse: set("Response"),
    setParams: set("params"),
  },
  getters: {
    WorkspaceTreeBaseJSON: (state) => {
      if (!state.WorkspaceJSON) return; 
      const shapeData = (e) => {
        return {
          id: e.id,
          name: e.name,
          isLeaf: e.isLeaf,
          pid: e.pid,
          addLeafNodeDisabled: e.addLeafNodeDisabled,
          addTreeNodeDisabled: e.addTreeNodeDisabled,
          delNodeDisabled: e.delNodeDisabled,
          dragDisabled: e.dragDisabled,
          editNodeDisabled: e.editNodeDisabled,
          BackgroundColor: e.BackgroundColor,
          DisplayInNavbar: e.DisplayInNavbar,
          DisplayInFooter: e.DisplayInFooter,
          Display: e.Display,
          color: e.color,
          textColor: e.textColor,
          ExternalLink: e.ExternalLink,
          DisplayAsMenu: e.DisplayAsMenu,
          Description: e.Description,
          children: Array.isArray(e.children)? e.children.map(c=>shapeData(c)) : null,
        }
      }
      if (!state.WorkspaceJSON) return; 
      return state.WorkspaceJSON.children.map(e=>{
        return shapeData(e)
      });
    },
    tiles: (state) => {
      if (!state.WorkspaceJSON) return; 
      let res = [];
      const shapeData = (e) => {
        if(e.isLeaf){
          res.push(e);
        }
        return {
          id: e.id,
          name: e.name,
          isLeaf: e.isLeaf,
          pid: e.pid,
          addLeafNodeDisabled: e.addLeafNodeDisabled,
          addTreeNodeDisabled: e.addTreeNodeDisabled,
          delNodeDisabled: e.delNodeDisabled,
          dragDisabled: e.dragDisabled,
          editNodeDisabled: e.editNodeDisabled,
          BackgroundColor: e.BackgroundColor,
          DisplayInNavbar: e.DisplayInNavbar,
          DisplayInFooter: e.DisplayInFooter,
          Display: e.Display,
          color: e.color,
          textColor: e.textColor,
          ExternalLink: e.ExternalLink,
          DisplayAsMenu: e.DisplayAsMenu,
          Description: e.Description,
          children: Array.isArray(e.children)? e.children.map(c=>shapeData(c)) : null,
        }
      }
      shapeData(state.WorkspaceJSON.children);
      if (!state.WorkspaceJSON) return; 
      state.WorkspaceJSON.children.forEach(e=>{
        shapeData(e);
      });
      return res;
    },
    groups: (state) => {
      if (!state.WorkspaceJSON) return; 
      let res = [];
      const shapeData = (e) => {
        if(e.isLeaf == false & e.pid != 0){
          res.push(e);
        }
        return {
          id: e.id,
          name: e.name,
          isLeaf: e.isLeaf,
          pid: e.pid,
          addLeafNodeDisabled: e.addLeafNodeDisabled,
          addTreeNodeDisabled: e.addTreeNodeDisabled,
          delNodeDisabled: e.delNodeDisabled,
          dragDisabled: e.dragDisabled,
          editNodeDisabled: e.editNodeDisabled,
          BackgroundColor: e.BackgroundColor,
          DisplayInNavbar: e.DisplayInNavbar,
          DisplayInFooter: e.DisplayInFooter,
          Display: e.Display,
          color: e.color,
          textColor: e.textColor,
          ExternalLink: e.ExternalLink,
          DisplayAsMenu: e.DisplayAsMenu,
          Description: e.Description,
          children: Array.isArray(e.children)? e.children.map(c=>shapeData(c)) : null,
        }
      }
      shapeData(state.WorkspaceJSON.children);
      if (!state.WorkspaceJSON) return; 
      state.WorkspaceJSON.children.forEach(e=>{
        shapeData(e);
      });
      return res;
    },
    footerItems: (getters) => {
      if(!getters.tiles) return;
      return getters.tiles.filter(e=>e.DisplayInFooter === 1);
    },
    params: (state) => {
      return state.params;
    },
    groupId: (getters,state) => {
      if(!state.groups) return;
      if(!getters.params) return;
      return state.groups.find(e=>e.name == state.params.Name).id;
    },
    viewGroup: (getters) => {
      if(!getters.groups) return;
      if(!getters.params) return;
      console.log(getters.groups)
      if(getters.params.ID){
        return getters.groups.find(e=>e.id == getters.params.ID);
      } else {
        return getters.groups.find(e=>e.name == getters.params.Name);
      }
    },
    viewTiles: (state,getters) => {
      if(!getters.tiles) return;
      if(!getters.viewGroup) return;
      let groups = state.groups.filter(e=>e.pid == getters.viewGroup.id);
      let tiles = getters.tiles.filter(e=>e.pid == getters.viewGroup.id);
      return groups.concat(tiles);
    },
    viewParent: (state,getters) => {
      if(!getters.tiles) return;
      if(!getters.viewGroup) return;
      let tiles = getters.tiles.filter(e=>e.id == getters.viewGroup.pid);
      let groups = state.groups.filter(e=>e.id == getters.viewGroup.pid);
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

    getQueryData: async function ({ state, commit }, req, WorkspaceJSON) {
      let urlParams = '';
      let commitTo = req['commitTo'];
      if (req) {
        let keys = Object.keys(req);
        let items = []
        keys.forEach(e => {
          items.push([e + '=' + req[e]])
        });
        urlParams = '?' + items.join('&');
      }
      if(WorkspaceJSON){
        //
      }
      let res = await fetch(`${state.server_name}/system/webdev/EAM/APIs/RUN_Query/${urlParams}`).then(r => r.json()).catch((e) => {
        Swal.fire({
          title: 'Failed to Load Named Query',
          text: e,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
      commit(commitTo, res);
      return res
    },
    getWorkspaceJSON: async function ({ state, commit }, req ) {
      let urlParams = '';
      let commitTo = req['commitTo'];
      if (req) {
        let keys = Object.keys(req);
        let items = []
        keys.forEach(e => {
          items.push([e + '=' + req[e]])
        });
        urlParams = '?' + items.join('&');
      }

      let res = await fetch(`${state.server_name}/system/webdev/EAM/APIs/RUN_Query/${urlParams}`).then(r => r.json()).catch((e) => {
        Swal.fire({
          title: 'Failed to Load Named Query',
          text: e,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });

      let json = JSON.parse(res[0].JSON_Data);
      let WorkspaceJSON = new Tree(json);
      commit(commitTo, WorkspaceJSON);
      return res
    },
    updateWorkspaceJSON: async function({state},req,e){
      console.log(state.WorkspaceID);
      console.log(req,e);
    },
    patchWorkspaceJSON: async function ({ state, commit }, req ) {
      console.log(req);
      let urlParams = '';
      let commitTo = req['commitTo'];
      let JSON_Data = null;
      if (req) {
        let keys = Object.keys(req);
        let items = []
        keys.forEach(e => {
          if (e == "JSON_Data") {
            JSON_Data = req[e]
          } else {
            items.push([e + '=' + req[e]])
          }
        });
        urlParams = '?' + items.join('&');
      }

      var requestOptions = {
        method: "POST",
        body: JSON_Data,
      };

      let res = await fetch(`${state.server_name}/system/webdev/EAM/APIs/RUN_Query/${urlParams}`,requestOptions).then(r => r.json()).catch((e) => {
        Swal.fire({
          title: 'Failed to Load Named Query',
          text: e,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });

      commit(commitTo, res);
      
    },

  },
  modules: {},
});
