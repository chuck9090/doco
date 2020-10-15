import Vue from "vue";
import AppComponent from "./App/App.vue";

import * as viewui from "view-design";
import "view-design/dist/styles/iview.css";
Vue.component("Button", viewui.Button);
Vue.component("Tabs", viewui.Tabs);
Vue.component("TabPane", viewui.TabPane);
Vue.component("Dropdown", viewui.Dropdown);
Vue.component("DropdownMenu", viewui.DropdownMenu);
Vue.prototype.$Notice = viewui.Notice;

Vue.component("app-component", AppComponent);

new Vue({
	el: "#app",
	render: createElement => {
		return createElement(AppComponent);
	}
});
