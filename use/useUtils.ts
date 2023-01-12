export function useUtils(): {
	formattedTime: Function;
	currentFormattedTime: Function;
	windDirection: Function;
} {
	/**
	 * Converts unix timestamp into 24hr format.
	 * @param number timeStamp
	 * @returns
	 */
	function formattedTime(timeStamp: number): string {
		if (timeStamp === undefined || timeStamp === null)
			throw new Error('timeStamp cannot be undefined', { cause: undefined });

		const formattedDate: Date = new Date(timeStamp * 1000);
		const hours: string | number =
			formattedDate.getHours() < 9
				? `0${formattedDate.getHours()}`
				: formattedDate.getHours();
		const mins: string | number =
			formattedDate.getMinutes() < 9
				? `0${formattedDate.getMinutes()}`
				: formattedDate.getMinutes();

		return `${hours}:${mins}`;
	}

	/**
	 *
	 * @returns Formatted current time
	 */
	function currentFormattedTime(): string {
		interface Week {
			[index: string]: string;
		}
		const weekDayMap: Week = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday',
		};
		const currentDate: Date = new Date();
		const time: string = currentDate.toLocaleTimeString('en-US', {
			hour12: false,
			timeStyle: 'short',
		});
		const day: string = currentDate.getDay().toString();

		return `${weekDayMap[day]}, ${time}`;
	}

	function windDirection(deg: number): string {
		interface Direction {
			[index: string]: string;
		}
		const directions: Direction = {
			11: 'N',
			33: 'NNE',
			56: 'NE',
			78: 'ENE',
			101: 'E',
			123: 'ESE',
			146: 'SE',
			168: 'SSE',
			191: 'S',
			213: 'SSW',
			236: 'SW',
			258: 'WSW',
			281: 'W',
			303: 'WNW',
			326: 'NW',
			348: 'NNW',
		};

		const nearestDirection: string = Object.keys(directions).reduce(
			(previous, current) =>
				Math.abs(Number(current) - deg) < Math.abs(Number(previous) - deg)
					? current
					: previous
		);

		return directions[nearestDirection];
	}

	return {
		formattedTime,
		currentFormattedTime,
		windDirection,
	};
}
