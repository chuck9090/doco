const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");
const fs = require("fs");

const packageInfo = (()=>{
	const pkgPath = path.join(__dirname, "package.json");
	const pkgData = JSON.parse(fs.readFileSync(pkgPath));
	return pkgData;
})();

// Generate pages object
const pagesObj = {};
const chromeName = ["popup", "setting", "singleDataQuery", "sqlExec"];

const proFileName = "dist";

chromeName.forEach(name => {
	pagesObj[name] = {
		entry: `src/${name}/index.js`,
		template: `src/${name}/index.html`,
		filename: `${name}.html`
	};
});

// 生成manifest文件
const manifest =
	process.env.NODE_ENV === "production" ? {
		from: path.resolve("src/manifest.production.json"),
		to: `${path.resolve(proFileName)}/manifest.json`
	} : {
		from: path.resolve("src/manifest.development.json"),
		to: `${path.resolve(proFileName)}/manifest.json`
	};

const plugins = [
	CopyWebpackPlugin([
		manifest,
		{
			from: path.resolve("src/assets"),
			to: `${path.resolve(proFileName)}/assets`
		}
	])
];

// 开发环境将热加载文件复制到dist文件夹
if (process.env.NODE_ENV !== "production") {
	plugins.push(
		CopyWebpackPlugin([{
			from: path.resolve("src/utils/hotReload.js"),
			to: path.resolve(proFileName)
		}])
	)
}

// 生产环境打包dist为zip
if (process.env.NODE_ENV === "production") {
	plugins.push(
		new ZipPlugin({
			path: path.resolve("zip/"),
			filename: `doco_${packageInfo.version}.zip`,
		})
	)
}

module.exports = {
	pages: pagesObj,
	outputDir: proFileName,
	// // 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	configureWebpack: {
		entry: {
			//"content": "./src/content/index.js",
			"background": "./src/background/index.js"
		},
		output: {
			filename: "js/[name].js"
		},
		plugins: plugins
	},
	css: {
		extract: {
			filename: "css/[name].css"
		}
	},
	chainWebpack: config => {
		// 处理字体文件名，去除hash值
		const fontsRule = config.module.rule("fonts")

		// 清除已有的所有 loader。
		// 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
		// limit的值要改大一点，至少要比字体文件大，否则会导致路径不对
		fontsRule.uses.clear()
		fontsRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
			.use("url")
			.loader("url-loader")
			.options({
				limit: 80000,
				name: "fonts/[name].[ext]"
			})

		// 查看打包组件大小情况
		if (process.env.npm_config_report) {
			config
				.plugin("webpack-bundle-analyzer")
				.use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
		}
	}
};
