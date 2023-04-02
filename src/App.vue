<template>
  <v-app :class="scrollbarTheme + ' overflow-auto'">
    <v-app-bar app elevation="0" color="transparent">
      <v-col cols="auto">
        <v-tabs v-if="show" hide-slider background-color="transparent" :color="linkColor"
          :active-class="linkColor + '--text'" :slider-color="linkColor" next-icon="mdi-arrow-right"
          prev-icon="mdi-arrow-left" show-arrows>
          <v-tab v-for="item in navBarItems" :key="item.ID" :to="item.Link" :color="item.Color"
            style="text-transform: none">
            <v-menu v-if="item.DisplayAsMenu && show" bottom right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" style="text-transform: none">
                  {{ item.Name }}
                  <v-icon right> mdi-menu-down </v-icon>
                </span>
              </template>

              <v-list>
                <v-list-item v-for="child in getChildern(item.ID)" :key="child.ID" :to="'/' + child.to">
                  {{ child.Name }}
                </v-list-item>
              </v-list>
            </v-menu>
            <span v-else>{{ item.Name }}</span>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn class="text-p" v-if="page" :href="
          '' +
          page.ID
        " target="_blank" text dense>
          <v-icon dense>mdi-cog-outline</v-icon>
        </v-btn>
      </v-col>
    </v-app-bar>

    <v-main :class="scrollbarTheme + ' overflow-auto'">
      <router-view />
    </v-main>

    <v-footer padless color="transparent" class="d-flex justify-space-between" app>
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
      if (!this.$store.state.page) return;
      return this.$store.state.page;
    },
    footerItems: function () {
      return this.$store.getters.footerItems;
    },
    linkColor: function () {
      if (!this.$store.state.theme) return;
      return this.$store.state.theme.isDark ? "white" : "black";
    },
    navBarItems: function () {
      if (!this.$store.state.groups) return;
      if (!Array.isArray(this.$store.state.groups)) return;
      let arr = [this.$store.state.page];
      arr[0].Link = "/";
      arr[0].Color = "White";
      this.$store.state.groups
        .filter((e) => e.DisplayInNavbar === 1)
        .forEach((e) => {
          if (e.DisplayAsMenu) {
            arr.push(e);
          } else {
            e.Link = "/" + e.Name;
            arr.push(e);
          }
        });
      return arr;
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
      return this.$store.state.groups
        .filter((e) => e.ParentID === ParentID)
        .map((e) => {
          e.type = "group";
          e.to = e.Name;
          return e;
        });
    },
  },
  created() {
    this.$store.commit("setRoutes", router.options.routes);
    this.theme = this.$vuetify.theme;
    this.$store.dispatch("getPages");
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
    page(page) {
      console.log('App.vue => page',page);
      document.title = page.Name;
      this.$store.dispatch("getGroupsByPageParentId");
      this.$store.dispatch("getTilesByPageParentId");
    },
    show(item) {
      if (!item) return;
      setTimeout(() => {
        this.$store.commit("setShow", true);
      }, 100);
    },
    route(item) {
      if (!item) return;
      if (!item.params.ID) return;
      console.log('App.vue => route',item);
      this.$store.dispatch("getPages");
      this.$store.dispatch("getGroupsByPageParentId");
      this.$store.dispatch("getTilesByPageParentId");
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
