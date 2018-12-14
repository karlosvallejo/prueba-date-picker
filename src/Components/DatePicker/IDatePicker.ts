namespace IDatePicker {
	export interface IStateDatePicker {
		chosenDate: Date | null;
	}

	export interface Date {
		possibleYears: Year[];
	}

	interface Year {
		year: number;
		possibleMonths: Month[];
	}

	interface Month {
		month: number;
		days: number[];
	}
}

export default IDatePicker;