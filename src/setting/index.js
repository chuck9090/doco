import Vue from "vue";

import * as viewui from "view-design";
import "view-design/dist/styles/iview.css";

Vue.component("Layout", viewui.Layout);
Vue.component("Header", viewui.Header);
Vue.component("Content", viewui.Content);
Vue.component("Footer", viewui.Footer);
Vue.component("Menu", viewui.Menu);
Vue.component("MenuItem", viewui.MenuItem);
Vue.component("Submenu", viewui.Submenu);
Vue.component("Sider", viewui.Sider);
Vue.component("Anchor", viewui.Anchor);
Vue.component("AnchorLink", viewui.AnchorLink);
Vue.component("Affix", viewui.Affix);
Vue.component("Row", viewui.Row);
Vue.component("Col", viewui.Col);
Vue.component("Icon", viewui.Icon);
Vue.component("Form", viewui.Form);
Vue.component("FormItem", viewui.FormItem);
Vue.component("Button", viewui.Button);
Vue.component("Input", viewui.Input);

import AppComponent from "./App/App.vue";
Vue.component("app-component", AppComponent);

new Vue({
	el: "#app",
	render: createElement => {
		return createElement(AppComponent);
	}
});
