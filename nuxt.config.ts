// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-16',
			title: 'Weather App',
			meta: [
				{
					name: 'Weather App',
					content:
						'Application to search and look current location weather details',
				},
			],
		},
	},
	modules: ['@vueuse/nuxt'],
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		public: {
			API_KEY: process.env.NUXT_API_KEY,
			API_URL: process.env.NUXT_API_URL,
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
