export function useWeather(): {
	userLocalWeatherData: Function;
	searchWeatherData: Function;
} {
	const runtimeConfig = useRuntimeConfig();
	const API_URL: string = runtimeConfig.public.API_URL;
	const API_KEY: string = runtimeConfig.public.API_KEY;

	async function userLocalWeatherData(latitude: number, longitude: number) {
		try {
			const { data } = await useFetch(
				`${API_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
			);
			return data;
		} catch (error) {
			return {
				error,
			};
		}
	}

	async function searchWeatherData(query: string): Promise<{}> {
		try {
			const { data } = await useFetch(
				`${API_URL}?q=${query}&units=metric&appid=${API_KEY}`
			);
			return data;
		} catch (error) {
			return {
				error,
			};
		}
	}

	return {
		userLocalWeatherData,
		searchWeatherData,
	};
}
