<template>
  <v-item-group>
    <v-container v-if="pageItems" fluid>
      <v-row justify="center" :class="scrollbarTheme + ' overflow-auto mt-0'">
        <div class="text-h5 font-weight-bold">
          {{ page.name.toUpperCase() }}
        </div>
      </v-row>
      <v-row class="mt-5" justify="center">
        <v-col v-for="item in pageItems" :key="item.id" cols="auto" class="pa-5">
          <v-hover>
            <v-item>
              <a v-if="item.isLeaf" :href="item.ExternalLink" :target="item.ExternalLink ? '_blank' : null" v-ripple class="materialDesignButton pl-6 pr-6 pa-4 ma-2rounded-circle d-flex align-center" :style="'background-color:' + item.color+';'">
                  {{ item.name }}
              </a>
              <router-link v-else :to="'/' + item.name"  class="materialDesignButton d-flex align-center"  :style="'background-color:' + item.color+';border-radius: 30%;'">
                  {{ item.name }}
              </router-link>
            </v-item>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Home",
  computed: {
    ...mapGetters(["WorkspaceTreeBaseJSON"]),
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
  },

  mounted(){
    this.getWorkspaceJSON();
  },

  methods: {
    getWorkspaceJSON: async function () {
      let obj = {};
      obj.namedQuery = "GET_Workspace";
      obj.ID = this.$store.state.WorkspaceID;
      console.log( this.$store.state);
      obj.commitTo = "setWorkspaceJSON";
      this.$store.dispatch("getWorkspaceJSON", obj);
    },
  },

};
</script>

<style>
html {
  overflow: auto;
}

.v-application .align-center {
  align-items: center !important;
  min-width: calc(15vh) !important;
  min-height: calc(15vh) !important;
  font-size-adjust: calc(20vh);
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
.materialDesignButton {
    color: #fff;
    border-radius: 5px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1.04em;
    letter-spacing: 0.05em;
    width: auto;
    transition: 0.3s;
    text-decoration:none;
    color:white !important;
    min-width:180px;
    min-height:180px;
    max-width: 180px;
    max-width: 180px;
    word-wrap: break-word;
    text-align: center;
    text-justify: inter-word;
}
.v-application .d-flex {
    display: flex !important;
    justify-content: center;
}
.materialDesignButton:hover {
    opacity: 0.7;
}
.v-application .align-center {
    align-items: center !important;
    min-width: 180px !important;
    min-height: 180px !important;
}
</style>
