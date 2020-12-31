import sqlFormatter from "sql-formatter";

const beaTool = (function() {
	function beautify() {}

	beautify.prototype.sql = function(text, step) {
		let indent = step || "    ";
		return sqlFormatter.format(text, {
			language: "sql",
			indent: indent
		});
	}

	beautify.prototype.sqlmin = function(text) {
		return text.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")");
	}

	return new beautify();
})();

function sqlBeautify(text, step) {
	let indent = step || "    ";
	return sqlFormatter.format(text, {
		language: "sql",
		indent: indent
	});
}

function sqlMin(text) {
	return text.replace(/\s{1,}/g, " ").replace(/\s{1,}\(/, "(").replace(/\s{1,}\)/, ")");
}

export {
	sqlBeautify,
	sqlMin
};
