import Vue from "vue";

import * as viewui from "view-design";
import "view-design/dist/styles/iview.css";
Vue.component("Layout", viewui.Layout);
Vue.component("Header", viewui.Header);
Vue.component("Menu", viewui.Menu);
Vue.component("MenuItem", viewui.MenuItem);
Vue.component("Content", viewui.Content);
Vue.component("Row", viewui.Row);
Vue.component("Col", viewui.Col);
Vue.component("Icon", viewui.Icon);
Vue.component("Button", viewui.Button);
Vue.component("Tabs", viewui.Tabs);
Vue.component("TabPane", viewui.TabPane);
Vue.component("Dropdown", viewui.Dropdown);
Vue.component("DropdownMenu", viewui.DropdownMenu);
Vue.component("Alert", viewui.Alert);
Vue.component("Split", viewui.Split);
Vue.component("Card", viewui.Card);
Vue.component("Table", viewui.Table);
Vue.prototype.$Notice = viewui.Notice;
Vue.prototype.$Message = viewui.Message;
Vue.component("Spin", viewui.Spin);
Vue.prototype.$Spin = viewui.Spin;

import AppComponent from "./App/App.vue";
Vue.component("app-component", AppComponent);

import VueBus from "../utils/vueBus.js";
Vue.use(VueBus);

new Vue({
	el: "#app",
	render: createElement => {
		return createElement(AppComponent);
	}
});
