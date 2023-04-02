<template>
  <v-item-group>
    <v-container v-if="page" fluid>
      <v-row justify="center" :class="scrollbarTheme + ' overflow-auto mt-0'">
        <div class="text-h5 font-weight-bold">
          {{ page.Name.toUpperCase() }}
        </div>
      </v-row>
      <v-row class="mt-5" justify="center">
        <v-col
          v-for="item in pageItems"
          :key="item.ID"
          cols="auto"
          class="pa-5"
        >
          <v-hover>
            
            <v-item  class="mx-auto" grow>
              <router-link
                :to="'/' + item.Name"
                v-ripple="{ center: true }"
                class="d-flex align-center rounded-circle"
                :style="
                  'background:' +
                  item.BackgroundColorHex +
                  ';' +
                  ' cursor:pointer;' +
                  'text-decoration:none;' +
                  'color:white;'
                "
              >
                <v-scroll-y-transition>
                  <div class="flex-grow-1 text-center">
                    {{ item.Name }}
                  </div>
                </v-scroll-y-transition>
              </router-link>
            </v-item>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: "Home",
  computed: {
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    pageItems: function () {
      if (!this.$store.state.page) return;
      if (!this.$store.state.groups) return;
      if (!Array.isArray(this.$store.state.groups)) return;
      return this.$store.state.groups.filter(
        (e) => e.ParentID === this.$store.state.page.ID
      );
    },
    page: function () {
      if (!this.$store.state.page) return;
      return this.$store.state.page;
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
    width: calc(18vh) !important;
    height: calc(18vh) !important;
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
