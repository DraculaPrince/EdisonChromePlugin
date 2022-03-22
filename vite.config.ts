import react from "@vitejs/plugin-react";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import styleImport from "vite-plugin-style-import";
import autoprefixer from "autoprefixer";
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	plugins: [
		styleImport({
			libs: [
				{
					libraryName: "antd",
					esModule: true,
					resolveStyle: (name) => {
						return `antd/es/${name}/style/index`;
					},
				},
			],
		}),
		react(),
		copy({
			targets: [
				{ src: "src/manifest.json", dest: "dist" },
				{ src: "src/assets", dest: "dist" },
			],
			hook: "writeBundle",
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				// 支持内联 JavaScript
				javascriptEnabled: true,
				// 重写 less 变量，定制样式
				modifyVars: {
					...{
						"primary-color": "red",
						"border-radius-base": " 4px",
						"link-color": "red",
					},
				},
			},
			sass: {
				// 支持内联 JavaScript
				javascriptEnabled: true,
			},
			scss: {
				// 支持内联 JavaScript
			},
		},
	},
	build: {
		rollupOptions: {
			input: ["index.html", "src/background.ts", "src/contentScript.ts"],
			output: {
				chunkFileNames: "[name].[hash].js",
				assetFileNames: "[name].[hash].[ext]",
				entryFileNames: "[name].js",
				dir: "dist",
			},
		},
	},
});
