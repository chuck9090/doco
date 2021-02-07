/*
event 不需要加前缀的“on”

*/

const install = function(Vue) {
	function checkEventParam(event) {
		if (!event || typeof event !== "string") {
			throw Error("event参数值有误！");
		}
		event = "on" + event;
		if (!window.hasOwnProperty(event)) {
			throw Error(event + "非window事件名！");
		}
	}

	function checkFuncParam(callback) {

	}

	const ev = {
		evs: {

		},
		//立马触发 event window事件,
		emit(event, callback) {
			checkEventParam(event);
		},
		//绑定 event window事件，事件触发时回调 callback
		on(event, callback) {
			checkEventParam(event);
		},
		//解绑 event window事件
		off(event) {
			checkEventParam(event);
		}
	};

	Vue.prototype.$windowEventHelper = ev;
}

export default install;
