<template>
  <v-app :class="scrollbarTheme + ' overflow-auto'">
    <v-app-bar app elevation="0" color="transparent">
      <v-col cols="auto">
        <v-tabs  hide-slider background-color="transparent" :color="linkColor"
          :active-class="linkColor + '--text'" :slider-color="linkColor" next-icon="mdi-arrow-right"
          prev-icon="mdi-arrow-left" show-arrows>
          <v-tab :to="'/'" >
           <v-btn>Workspace</v-btn> 
          </v-tab>
          <v-tab v-for="item in navBarItems" :key="item.id" :to="'/'+item.name" 
            style="text-transform: none">
            <v-menu v-if="item.DisplayAsMenu " bottom right open-on-hover offset-y>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" style="text-transform: none">
                  {{ item.name }}
                  <v-icon right> mdi-menu-down </v-icon>
                </span>
              </template>

              <v-list>
                <v-list-item v-for="child in getChildern(item.id)" :key="child.id" :to="'/' + child.to">
                  {{ child.name }}
                </v-list-item>
              </v-list>
            </v-menu>
            <span v-else>{{ item.name }}</span>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn class="text-p" v-if="page" to="/Editor" text dense>
          <v-icon dense>mdi-cog-outline</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>

    <v-main :class="scrollbarTheme + ' overflow-auto'">
      <router-view />
    </v-main>

    <v-footer padless color="transparent" class="d-flex justify-space-between mt-10" app dense>
      <v-col cols="1"> </v-col>
      <v-col cols="auto">
        <v-breadcrumbs :items="footerItems" divider="|">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.ExternalLink" :disabled="item.disabled" style="text-transform: none"
              target="_blank" class="">
              {{ item.Name }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
      <v-col cols="1">
        <v-menu v-model="menu" offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" dense small>
              <v-icon dense>mdi-brightness-7</v-icon>
              <div class="ms-1">Theme</div>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-btn text @click="
                    theme.isDark = false;
                    $vuetify.theme.dark = false;
                  show = false;
                                        ">
                    <v-avatar size="36px" tile class="mx-1">
                      <v-img :src="lightIcon" width="30" class="pa-3"></v-img>
                    </v-avatar>
                    Light</v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-btn text @click="
                    theme.isDark = true;
                    $vuetify.theme.dark = true;
                  show = false;
                                        ">
                    <v-avatar size="36px" tile class="mx-1">
                      <v-img :src="darkIcon" width="30" class="pa-3"></v-img>
                    </v-avatar>
                    Dark</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import router from "@/router";
import lightIcon from "./assets/light-menu-icon.svg";
import darkIcon from "./assets/dark-menu-icon.svg";
import { mapGetters } from 'vuex';
export default {
  name: "App",

  data: () => ({
    lightIcon,
    darkIcon,
    menu: null,
    drawer: false,
    tab: -1,
    more: ["News", "Maps", "Books", "Flights", "Apps"],
  }),
  computed: {
    ...mapGetters(["WorkspaceTreeBaseJSON"]),
    route: {
      get() {
        return this.$store.state.route;
      },
      set(value) {
        this.$store.commit("setRoute", value);
      },
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(value) {
        this.$store.commit("setTheme", value);
      },
    },
    show: {
      get() {
        return this.$store.state.show;
      },
      set(value) {
        this.$store.commit("setShow", value);
      },
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    page: function () {
      if (!this.WorkspaceTreeBaseJSON) return;
      return this.WorkspaceTreeBaseJSON[0];
    },
    pageItems: function () {
      if (!this.page) return;
      return this.page.children;
    },
    footerItems: function () {
      return this.$store.getters.footerItems;
    },
    linkColor: function () {
      if (!this.$store.state.theme) return;
      return this.$store.state.theme.isDark ? "white" : "black";
    },
    navBarItems: function () {
      if (!this.page) return;
      if (!this.pageItems) return;
      if (!Array.isArray(this.pageItems)) return;
      return this.pageItems.filter(e=>e.DisplayInNavbar == true)
    },
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
    navigate(path) {
      this.$router.push({ path: path });
    },
    getChildern(ParentID) {
      return this.$store.getters.groups
        .filter((e) => e.pid === ParentID)
        .map((e) => {
          e.type = "group";
          e.to = e.name;
          return e;
        });
    },
    getWorkspaceJSON: async function () {
      let obj = {};
      obj.namedQuery = "GET_Workspace";
      obj.ID = this.$store.state.WorkspaceID;
      obj.commitTo = "setWorkspaceJSON";
      this.$store.dispatch("getWorkspaceJSON", obj);
    },
  },
  created() {
    this.$store.commit("setRoutes", router.options.routes);
    this.theme = this.$vuetify.theme;
  },
  mounted() {
    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    document.querySelector("#app").__vue__.$vuetify.theme.isDark =
      darkModeMediaQuery.matches;
    darkModeMediaQuery.addListener((e) => {
      let darkModeOn = e.matches;
      this.$store.dispatch("setGlobalTheme", darkModeOn);
      document.querySelector("#app").__vue__.$vuetify.theme.isDark = darkModeOn;
      console.log(`Dark mode is ${darkModeOn ? "🌒 on" : "☀️ off"}.`);
    });
  },
  watch: {
    theme(theme){
      console.log(theme)
    },
    page(page) {
      document.title = page.name;
    },
    show(item) {
      if (!item) return;
      setTimeout(() => {
        this.$store.commit("setShow", true);
      }, 500);
    },
    route(item) {
      if (!item) return;
      if (!item.params.id) return;
    },
  },
};
</script>

<style>
html {
  overflow: auto;
}

.v-breadcrumbs__item {
  color: #9c9c9c !important;
  font-size: 16px !important;
}

.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
