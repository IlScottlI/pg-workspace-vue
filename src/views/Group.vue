<template>
<v-item-group>
    <v-container v-if="viewGroup" fluid>
        <v-row :class="scrollbarTheme + ' overflow-auto mt-0'" justify="center">
            <div class="text-h6 font-weight-bold">
                {{ viewGroup.name.toUpperCase() }}
            </div>
            <v-btn v-if="viewParent" top left absolute text :to="'/' + viewParent.name">
                <v-icon>mdi-arrow-up-left-bold</v-icon>
                <span class="ps-2 text-h6">{{ viewParent.name }}</span>
            </v-btn>
        </v-row>
        <v-row class="mt-5" justify="center">
            <div v-for="item in viewTiles" :key="item.id">
                <v-col class="pa-5" cols="auto">
                    <v-item style="text-align: center">
                        <a v-if="item.isLeaf" :href="item.ExternalLink" :target="item.ExternalLink ? '_blank' : null" v-ripple class="materialDesignButton pl-6 pr-6 pa-4 ma-2 d-flex align-center rounded-circle d-flex align-center" :style="'background-color:' + item.color+';'">
                            {{ item.name }}
                        </a>
                        <router-link v-else :to="'/' + viewGroup.name + '/' + item.id"  class="materialDesignButton pl-6 pr-6 pa-4 ma-2 d-flex align-center d-flex align-center"  :style="'background-color:' + item.color+';border-radius: 30%;'">
                                {{ item.name }}
                        </router-link>
                    </v-item>
                </v-col>
            </div>
        </v-row>
    </v-container>
</v-item-group>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    name: "Group",
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters(['groups']),
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
        groups_: {
            get() {
                return this.$store.state.groups;
            },
            set(value) {
                this.$store.commit("setGroups", value);
            },
        },
        params: {
            get() {
                return this.$store.state.params;
            },
            set(value) {
                this.$store.commit("setParams", value);
            },
        },
    },

    methods: {
        getWorkspaceJSON: async function () {
            let obj = {};
            obj.namedQuery = "GET_Workspace";
            obj.ID = this.$store.state.WorkspaceID;
            obj.commitTo = "setWorkspaceJSON";
            this.$store.dispatch("getWorkspaceJSON", obj);
        },
    },

    mounted() {
        this.getWorkspaceJSON();
        this.params = this.$route.params;
    },

    watch: {
        $route(to, from) {
            console.log(to, from);
            this.params = to.params;
            this.getWorkspaceJSON();
        },
        groups(val) {
            this.groups_ = val;
        }
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
    display: inline-block;
    word-wrap: break-word;
}

.materialDesignButton:hover {
    opacity: 0.7;
}

.v-application .align-center {
    align-items: center !important;
    min-width: 180px !important;
    min-height: 180px !important;
}
.v-application .d-flex {
    display: flex !important;
    justify-content: center;
}
</style>
