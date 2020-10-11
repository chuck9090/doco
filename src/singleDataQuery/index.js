import Vue from "vue";
import AppComponent from "./App/App.vue";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.component("app-component", AppComponent);

new Vue({
	el: "#app",
	render: createElement => {
		return createElement(AppComponent);
	}
});
