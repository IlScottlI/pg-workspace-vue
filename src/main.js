import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTreeList from "vue-tree-list";
import mixins from "vuetify-multiple-draggable-dialogs";

Vue.use(VueTreeList)
Vue.config.productionTip = false;
Vue.mixin(mixins);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
