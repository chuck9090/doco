import Vue from "vue";
import AppComponent from "./App/App.vue";

import {
	Button,
	Tabs,
	TabPane,
	Dropdown,
	DropdownMenu,
	Notice
} from "view-design";
import "view-design/dist/styles/iview.css";
Vue.component("Button", Button);
Vue.component("Tabs", Tabs);
Vue.component("TabPane", TabPane);
Vue.component("Dropdown", Dropdown);
Vue.component("DropdownMenu", DropdownMenu);
Vue.prototype.$Notice = Notice;

Vue.component("app-component", AppComponent);

new Vue({
	el: "#app",
	render: createElement => {
		return createElement(AppComponent);
	}
});
