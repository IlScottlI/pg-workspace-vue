<template>
  <v-item-group>
    <v-container v-if="viewGroup" fluid>
      <v-row :class="scrollbarTheme + ' overflow-auto mt-0'" justify="center">
        <div class="text-h5 font-weight-bold">
          {{ viewGroup.Name.toUpperCase() }}
        </div>
        <v-btn
          v-if="viewParent"
          top
          left
          absolute
          text
          :to="'/' + viewParent.Name"
        >
          <v-icon>mdi-arrow-up-left-bold</v-icon>
          <span class="ps-2 text-h5">{{ viewParent.Name }}</span>
        </v-btn>
      </v-row>
      <v-row class="mt-5" justify="center">
        <div v-for="item in viewTiles" :key="item.ID">
          <v-col class="pa-5" cols="auto" v-if="item.IsVisible">
            <v-item style="text-align: center" class="rounded-circle">
              <a
                v-if="item.ExternalLink"
                v-ripple="{ center: true }"
                :href="item.ExternalLink"
                :target="item.ExternalLink ? '_blank' : null"
                class="d-flex align-center"
                :style="
                  'background:' +
                  item.BackgroundColorHex +
                  ';' +
                  'cursor:pointer;' +
                  'text-decoration:none;' +
                  'color:white;'
                "
              >
                {{ item.Name }}
              </a>
              <router-link
                v-else
                :to="'/' + viewGroup.Name + '/' + item.ID"
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
                  <div class="text-p flex-grow-1 text-center">
                    {{ item.Name }}
                  </div>
                </v-scroll-y-transition>
              </router-link>
            </v-item>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  name: "Group",
  data: () => ({
    //
  }),
  computed: {
    groups: {
      get() {
        return this.$store.state.groups;
      },
      set(value) {
        this.$store.commit("setGroups", value);
      },
    },
    scrollbarTheme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    viewGroup: function () {
      return this.$store.getters.viewGroup;
    },
    viewTiles: function () {
      return this.$store.getters.viewTiles;
    },
    viewParent: function () {
      return this.$store.getters.viewParent;
    },
  },
  mounted() {},
  watch: {
    //
  },
};
</script>

<style>
html {
  overflow: auto;
}
.v-btn {
  text-transform: none;
}
.v-application .d-flex {
    display: flex !important;
    justify-content: center;
    padding: 10px;
    /* font-size: smaller; */
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
