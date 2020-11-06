import Vue from "vue";

import * as viewui from "view-design";
import "view-design/dist/styles/iview.css";
Vue.component("Card", viewui.Card);
Vue.component("CellGroup", viewui.CellGroup);
Vue.component("Cell", viewui.Cell);

import AppComponent from "./App/App.vue"
Vue.component("app-component", AppComponent)

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent)
  }
})
