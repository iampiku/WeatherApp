<template>
	<!-- weather-details-card -->
	<main
		class="scroll-smooth bg-gradient-to-r from-[#8ecae6] to-[#3b4d68] min-h-screen grid place-items-center">
		<div v-if="loading" class="flex">
			<img
				class="animate-spin h-8 w-8 mr-3"
				src="@/assets/images/spinner-svgrepo-com.svg"
				alt="loadingSpinner" />
			<span class="mt-1">Loading...</span>
		</div>

		<!-- Invalid Search pop up -->
		<div
			v-if="showAlert"
			@click="showAlert = false"
			class="bg-red-100 flex flex-row rounded-lg py-4 px-4 mb-2 text-base text-red-700 absolute top-6 right-12 shadow-2xl"
			role="alert">
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="times-circle"
				class="w-4 h-4 mr-2 mt-1 fill-current"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512">
				<path
					fill="currentColor"
					d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
			</svg>
			Invalid Search!
		</div>
		<!-- card -->
		<section
			v-if="weatherData"
			class="sm:rounded-3xl shadow-xl bg-white grid grid-cols-6 md:grid-cols-3 xs:w-screen sm:w-2/3 md:min-w-fit sm:grid-cols-1 xs:grid-cols-1">
			<!-- right-section -->
			<div class="grid grid-cols-1 text-center p-10 col-span-2 md:col-span-1">
				<header class="text-gray-900 text-4xl leading-tight font-medium pb-3">
					{{ weatherData.name }}, {{ weatherData.sys.country }}
				</header>
				<p class="text-gray-900 text-lg leading-tight font-semibold">
					{{ weatherData.weather[0].main }}
				</p>
				<picture class="mx-auto">
					<img
						class="w-32"
						:src="'/_nuxt/' + weatherIcons(weatherData.weather[0].id)"
						alt="weather-icon" />
				</picture>
				<p class="text-gray-700 text-7xl font-bold">
					{{ Math.round(weatherData.main.temp) }}&deg;C
				</p>
				<p class="text-gray-700 text-base">
					Feels like {{ Math.round(weatherData.main.feels_like) }}&deg;C
				</p>
			</div>

			<!-- left-section -->
			<div
				class="bg-gray-200 col-span-4 sm:rounded-b-3xl md:rounded-r-3xl md:rounded-l-none md:col-span-2">
				<div class="flex justify-between px-4 pt-4 xs:flex-col md:flex-row">
					<header
						class="text-gray-900 text-2xl leading-tight font-medium mb-2 xs:text-center">
						{{ currentTime }}
					</header>
					<input
						type="text"
						@keyup.enter="fetchSearchData"
						placeholder="Search Location...🌍"
						class="form-input border border-solid border-gray-300 px-4 rounded-full focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none xs:py-2 sm:py-1"
						v-model.trim="query" />
				</div>

				<div
					class="grid gap-4 sm:grid-cols-2 xs:grid-cols-1 lg:grid-cols-3 m-4 text-right text-2xl">
					<div class="p-5 bg-white rounded-3xl">
						<p>Humidity</p>
						<p class="font-medium">{{ weatherData.main.humidity }}</p>
						<p>%</p>
						<img
							class="w-16"
							src="@/assets/images/icons8-hygrometer-96.png"
							alt="" />
					</div>
					<div class="p-5 bg-white rounded-3xl">
						<p>Wind speed</p>
						<p class="font-medium">{{ weatherData.wind.speed }}</p>
						<p>m/s</p>
						<img class="w-16" src="@/assets/images/icons8-wind-96.png" alt="" />
					</div>
					<div class="p-5 bg-white rounded-3xl">
						<p>Wind direction</p>
						<p class="font-medium">
							{{ windDirection(Math.round(weatherData.wind.deg)) }}
						</p>
						<img
							class="w-16 sm:pt-6"
							src="@/assets/images/icons8-compass-north-96.png"
							alt="" />
					</div>
					<div class="p-5 bg-white rounded-3xl">
						<p>Visibility</p>
						<p class="font-medium">{{ weatherData.visibility / 1000 }}</p>
						<p>km</p>
						<img
							class="w-16"
							src="@/assets/images/icons8-binoculars-96.png"
							alt="" />
					</div>
					<div class="p-5 bg-white rounded-3xl">
						<p>Sunset</p>
						<p class="font-medium">
							{{ formattedTime(weatherData.sys.sunset) }}
						</p>
						<img
							class="w-16 lg:pt-6"
							src="@/assets/images/icons8-sunset-96.png"
							alt="" />
					</div>
					<div class="p-5 bg-white rounded-3xl">
						<p>Sunrise</p>
						<p class="font-medium">
							{{ formattedTime(weatherData.sys.sunrise) }}
						</p>
						<img
							class="w-16 lg:pt-6"
							src="@/assets/images/icons8-sunrise-96.png"
							alt="" />
					</div>
				</div>
			</div>
		</section>

		<section v-else></section>
	</main>
</template>

<script setup lang="ts">
	/**
	 * importing Composable.
	 */
	import { useWeather } from '@/use/useWeather';
	import { useUtils } from '@/use/useUtils';

	/**
	 * Weather API fetch composable
	 */
	const { userLocalWeatherData, searchWeatherData } = useWeather();
	/**
	 * Utils composable
	 */
	const { formattedTime, currentFormattedTime, windDirection } = useUtils();
	/**
	 * To obtain user Geolocation.
	 */
	const { coords, error } = useGeolocation({
		immediate: true,
		enableHighAccuracy: true,
	});

	/**
	 * Reactive data properties.
	 */
	const query = useState<string>('query', () => '');
	const weatherData = useState<any>('weatherData', () => null);
	const loading = useState<boolean>('loading', () => false);
	const showAlert = useState<boolean>('showAlert', () => false);
	const currentTime = useState<string>('currentTime', () =>
		currentFormattedTime()
	);

	/**
	 * Fetching weather Data based on user query.
	 */
	const fetchSearchData = async (): Promise<void> => {
		if (!query.value.length) return;

		weatherData.value = await searchWeatherData(query.value);

		if (weatherData.value === null) {
			loading.value = true;
			showAlert.value = true;
			setTimeout(() => {
				showAlert.value = false;
			}, 5000);
			weatherData.value = await userLocalWeatherData(28.65195, 77.23149);
			loading.value = false;
		}
	};

	const weatherIcons = (weatherCode: number): string => {
		if (weatherCode >= 200 && weatherCode <= 232)
			return 'assets/images/icons8-stormy-weather-96.png';
		else if (weatherCode >= 300 && weatherCode <= 321)
			return 'assets/images/icons8-windy-weather-96.png'; // img
		else if (weatherCode >= 500 && weatherCode <= 531)
			return 'assets/images/icons8-rain-96.png';
		else if (weatherCode >= 600 && weatherCode <= 622)
			return 'assets/images/icons8-snow-96.png';
		else if (weatherCode >= 701 && weatherCode <= 781)
			return 'assets/images/icons8-fog-96.png';
		else if (weatherCode >= 801 && weatherCode <= 804)
			return 'assets/images/icons8-clouds-96.png';
		else return 'assets/images/icons8-summer-96.png';
	};

	watch(
		error,
		async (newError) => {
			if (
				newError?.PERMISSION_DENIED ||
				newError?.POSITION_UNAVAILABLE ||
				newError?.TIMEOUT
			) {
				weatherData.value = await userLocalWeatherData(28.65195, 77.23149);
				loading.value = false;
			}
		},
		{ deep: true }
	);

	watch(
		coords,
		async (newCoords) => {
			if (
				typeof newCoords.latitude === 'number' &&
				typeof newCoords.longitude === 'number'
			) {
				weatherData.value = await userLocalWeatherData(
					newCoords.latitude,
					newCoords.longitude
				);
				loading.value = false;
			}
		},
		{ deep: true }
	);

	onMounted(async () => {
		loading.value = true;
		setInterval(() => (currentTime.value = currentFormattedTime()), 60000);
	});
</script>
