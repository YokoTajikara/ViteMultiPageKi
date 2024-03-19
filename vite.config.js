// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import handlebars from 'vite-plugin-handlebars';

const pageData = {
	'/index.html': {
		title: 'トップページxx',
	},
	'/blog/index.html': {
		title: 'blogページxx',
	},
	'/blog/ifg7/index.html': {
		title: 'blog ifg7ページxx',
	},
	'/nested/index.html': {
		title: 'nestedページxx',
	},
};

export default defineConfig({
	base: './',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				nested: resolve(__dirname, 'nested/index.html'),
				blog: resolve(__dirname, 'blog/index.html'),
				blog_ifg7: resolve(__dirname, 'blog/ifg7/index.html'),
			},
			output: {
				// エントリーポイントごとのファイル出力設定
				entryFileNames: `assets/js/[name].[hash].js`,
				// チャンクファイル（非エントリーポイントのコード分割されたファイル）の設定
				chunkFileNames: `assets/js/[name].[hash].js`,
				// 動的インポートされるモジュールの設定
				assetFileNames: (assetInfo) => {
					if (assetInfo.name.endsWith('.css')) {
						return `assets/css/[name].[hash][extname]`;
					}
					// 画像やフォントなどのアセット
					return `assets/images/[name].[hash][extname]`;
				}
			}
		},
	},
	plugins: [
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime']
		}),
		handlebars({
			partialDirectory: resolve(__dirname, './components'),
			context(pagePath) {
				return pageData[pagePath];
			},
		}),
		/* viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 75,
				// EXIFデータを保持するオプションを追加
				//preserve: true
			},
			mozjpg: {
				quality: 75,
				// EXIFデータを保持するオプションを追加
				preserve: true
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
				strip: false
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
					},
					{
						name: 'removeEmptyAttrs',
						active: false,
					},
				],
			},
		}), */
	],
})