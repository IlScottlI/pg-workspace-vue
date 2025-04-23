<template>
<v-container>
    <v-card>
        <v-btn
            fab
            dark
            color="primary"
            class="floating-save-btn"
            @click="updateWorkspaceJSON"
            >
            <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <vue-tree-list v-if="WorkspaceJSON" @click="onClick" @change-name="onChangeName" @delete-node="onDel" @add-node="onAddNode" @drag-end="onDragEnd" @drag="onDragEnd" :model="WorkspaceJSON" default-tree-node-name="New Folder" default-leaf-node-name="New Link" defaultAddLeafNodeTitle="Add Link" default-add-Tree-node-title="Add Folder" v-bind:default-expanded="true">

            <template v-slot:leafNameDisplay="slotProps">

                <span v-if="slotProps.model.isLeaf" @blur="onEditBlur">
                    {{ slotProps.model.name }}
                </span>
                <span v-else @blur="onEditBlur">
                    {{ slotProps.model.name }}
                </span>
            </template>

            <template v-slot:editNodeIcon="slotProps">
                <span :slotProps="slotProps" @click="onEditStart">
                    <v-dialog v-model="slotProps.model.dialog" width="800">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn text v-bind="attrs" v-on="on">
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title style="cursor: move;" class="text-p">
                                {{ slotProps.model.name }}
                            </v-card-title>

                            <v-card-text>
                                <v-row justify="space-around">
                                    <v-col class="pt-15 ps-15">
                                        <a v-if="slotProps.model.isLeaf" :href="slotProps.model.ExternalLink" :target="slotProps.model.ExternalLink ? '_blank' : null" v-ripple class="materialDesignButton rounded-circle d-flex align-center" :style="{ backgroundColor: slotProps.model.color }">
                                            {{ slotProps.model.name }}
                                        </a>
                                        <router-link v-else :to="'/' + slotProps.model.name + '/' + slotProps.model.id" class="materialDesignButton d-flex align-center"  :style="{ backgroundColor: slotProps.model.color , borderRadius: '30%'}">
                                            {{ slotProps.model.name }}
                                        </router-link>
                                    </v-col>

                                    <v-col class="pe-15">
                                        <v-color-picker
                                        v-model="slotProps.model.color"
                                        mode="hexa"
                                        class="ma-2"
                                        hide-canvas
                                        show-swatches
                                        swatches-max-height="150px"
                                        @update:color="() => { $forceUpdate(); $forceUpdate(); updateWorkspaceJSON();}"
                                        />
                                    </v-col>
                                </v-row>

                                <v-text-field v-model="slotProps.model.name" label="Name" @change="updateWorkspaceJSON()"></v-text-field>
                                <v-text-field v-if="slotProps.model.isLeaf" v-model="slotProps.model.ExternalLink" label="ExternalLink" @change="updateWorkspaceJSON()"></v-text-field>
                                <v-row>
                                    <v-col>
                                        <v-checkbox v-if="(slotProps.model.isLeaf != true ? (slotProps.model.pid == 1) : false) " v-model="slotProps.model.DisplayInNavbar" label="Display In Navbar" @change="updateWorkspaceJSON()"></v-checkbox>
                                    </v-col>
                                    <v-col>
                                        <v-checkbox v-if="(slotProps.model.isLeaf != true ? (slotProps.model.pid == 1) : false) " v-model="slotProps.model.DisplayAsMenu" label="Display as Menu" @change="updateWorkspaceJSON()"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea name="description" label="Description" v-model="slotProps.model.Description"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="slotProps.model.dialog = false">
                                    Close
                                </v-btn>
                                <v-btn v-if="false" color="primary" text @click="() => { updateWorkspaceJSON(); slotProps.model.dialog = false; }">
                                Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </span>
            </template>

            <template v-slot:delNodeIcon="slotProps">
                <span :slotProps="slotProps">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </span>
            </template>

            <template v-slot:addTreeNodeIcon="slotProps">
                <span :slotProps="slotProps">
                    <v-icon>
                        mdi-folder
                    </v-icon>
                </span>
            </template>

            <template v-slot:leafNodeIcon="slotProps">
                <span :slotProps="slotProps">
                    <a :href="slotProps.model.ExternalLink" :target="slotProps.model.ExternalLink ? '_blank' : null">
                        <v-icon :color="slotProps.model.color">
                            mdi-link-box
                        </v-icon>
                    </a>
                </span>
            </template>

            <template v-slot:addLeafNodeIcon="slotProps">
                <span :slotProps="slotProps">
                    <v-icon>
                        mdi-link-box
                    </v-icon>
                </span>
            </template>

            <template v-slot:treeNodeIcon="slotProps">
                <span :slotProps="slotProps">
                    <v-icon :color="slotProps.model.color" @click="slotProps.model.dialog = true">
                        mdi-folder
                    </v-icon>
                </span>
            </template>
        </vue-tree-list>

    </v-card>

    <v-card>
        <v-card-title>
            <v-switch v-model="showJSON" label="Show JSON">
            </v-switch>
        </v-card-title>
        <v-dialog v-model="showJSON" width="400" hide-overlay scrollable persistent>
            <v-card>
                <v-card-title style="cursor: move;">
                    Configuration JSON
                </v-card-title>

                <v-card-text style="height: 300px;">
                    <JsonViewer :value="WorkspaceTreeBaseJSON" :expand-depth=5 copyable boxed sort>
                    </JsonViewer>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="showJSON = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
    <v-snackbar
  v-model="snackbar.show"
  :color="snackbar.color"
  timeout="3000"
  bottom
  right
>
  {{ snackbar.text }}
</v-snackbar>
</v-container>
</template>

<script>
import {
    VueTreeList,
    Tree,
    TreeNode
} from 'vue-tree-list';
import JsonViewer from 'vue-json-viewer'
import {
    mapGetters
} from 'vuex';

export default {
    components: {
        VueTreeList,
        JsonViewer,
    },
    data() {
        return {
            newTree: {},
            modified: 0,
            showJSON: false,
            hasPendingChanges: false,
            structureSnapshot: null,
            snackbar: {
                show: false,
                text: '',
                color: 'success'
                },
            data: new Tree([{
                name: 'Workspace',
                id: 1,
                pid: 0,
                dragDisabled: false,
                addTreeNodeDisabled: false,
                addLeafNodeDisabled: false,
                editNodeDisabled: true,
                delNodeDisabled: true,
            }, ])
        }
    },

    computed: {
        ...mapGetters(["WorkspaceTreeBaseJSON"]),
        WorkspaceJSON: {
            get() {
                return this.$store.state.WorkspaceJSON;
            },
            set(value) {
                this.$store.commit("setWorkspaceJSON", value);
            },
        },
    },

    created() {
        this.getWorkspaceJSON();
    },

    methods: {
        onDel(node) {
            console.log("onDel", node);
            node.remove();
            this.updateWorkspaceJSON();
        },

        onChangeName(params) {
            console.log("onChangeName", params);
            this.updateWorkspaceJSON();
        },

        onDragEnd(evt) {
            console.log("Node moved:", evt);
            this.updateWorkspaceJSON();  // Save updated structure to backend
        },

        onAddNode(params) {
            console.log("onAddNode", params);

            params.color = "#212121FF";
            params.textColor = 'white';

            // Set default ExternalLink and other fields only for leaf nodes
            if (params.isLeaf) {
                this.$set(params, 'ExternalLink', '');
            }

            // Set defaults for all node types
            this.$set(params, 'Description', '');
            this.$set(params, 'DisplayInNavbar', false);
            this.$set(params, 'DisplayAsMenu', false);
            this.$set(params, 'dialog', false); // Also ensures the dialog will work

            this.updateWorkspaceJSON();
        },

        onClick(params) {
            console.log("onClick", params);
            this.updateWorkspaceJSON();
        },

        onEditStart(params) {
            console.log("onEditStart", params);
            this.updateWorkspaceJSON();
        },

        onEditBlur(params) {
            console.log("onEditBlur", params);
            this.updateWorkspaceJSON();
        },

        addNode() {
            var node = new TreeNode({
                name: 'New Folder',
                isLeaf: false,
                textColor: "white",
            });
            if (!this.data.children) this.data.children = [];
            this.data.addChildren(node);
            this.updateWorkspaceJSON();
        },

        getWorkspaceJSON: async function () {
            let obj = {};
            obj.namedQuery = "GET_Workspace";
            obj.ID = this.$store.state.WorkspaceID;
            obj.commitTo = "setWorkspaceJSON";
            this.$store.dispatch("getWorkspaceJSON", obj);
        },

        updateWorkspaceJSON: async function () {
            let obj = {
                namedQuery: "PATCH_Workspace",
                commitTo: "setResponse",
                ID: this.$store.state.WorkspaceID,
                JSON_Data: JSON.stringify(this.WorkspaceTreeBaseJSON)
            };

            try {
                await this.$store.dispatch("patchWorkspaceJSON", obj);
                this.snackbar = {
                show: true,
                text: 'Workspace saved successfully!',
                color: 'success'
                };
            } catch (e) {
                this.snackbar = {
                show: true,
                text: 'Error saving workspace!',
                color: 'error'
                };
            }
        },
        hasStructureChanged(newTree, oldTree) {
            const flatten = (tree, acc = []) => {
            if (!tree || typeof tree !== 'object') return acc;
            if ('id' in tree && 'pid' in tree) {
                acc.push({ id: tree.id, pid: tree.pid });
            }
            if (Array.isArray(tree.children)) {
                tree.children.forEach(child => flatten(child, acc));
            }
            return acc;
            };

            const flattenArray = (arr) => {
            return arr.reduce((acc, node) => flatten(node, acc), []);
            };

            const newFlat = flattenArray(Array.isArray(newTree) ? newTree : [newTree]);
            const oldFlat = flattenArray(Array.isArray(oldTree) ? oldTree : [oldTree]);

            return JSON.stringify(newFlat) !== JSON.stringify(oldFlat);
        },
        getFlatStructure(tree) {
            const result = [];
            const traverse = (node) => {
            if (!node) return;
            result.push({ id: node.id, pid: node.pid });
            if (Array.isArray(node.children)) {
                node.children.forEach(traverse);
            }
            };

            const roots = Array.isArray(tree) ? tree : [tree];
            roots.forEach(traverse);
            return result;
        },
    },

    mounted() {
        this.activateMultipleDraggableDialogs();
        this.structureSnapshot = this.getFlatStructure(this.WorkspaceJSON);
    },

    watch: {
        WorkspaceTreeBaseJSON(WorkspaceTreeBaseJSON) {
            this.modified++;
            console.log("WorkspaceTreeBaseJSON", WorkspaceTreeBaseJSON);
        },
        modified(modified) {
            console.log(modified);
        },
        WorkspaceJSON: {
            handler(newVal, oldVal) {
            if (!newVal || !oldVal) return;

            if (this.hasStructureChanged(newVal, oldVal)) {
                console.log("Structure changed!");
                this.hasPendingChanges = true;
            } else {
                console.log("Structure did not change.");
            }
            },
            deep: true
        }
    },
}
</script>

<style>
.vtl-node-main:hover {
    background-color: #f0f0f05f
}

.materialDesignButton {
    color: #fff;
    border-radius: 5px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1.04em;
    letter-spacing: 0.05em;
    width: auto;
    transition: 0.3s;
    text-decoration: none;
    color: white !important;
    min-width: 180px;
    min-height: 180px;
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
.main-content {
  padding-top: 64px; /* adjust to match your navbar height */
}
.floating-save-btn {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}
</style>
