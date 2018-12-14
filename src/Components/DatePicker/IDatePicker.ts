export interface IStateDatePicker {
	chosenDate: Date | null;
}

export interface IPropsDatePicker {
	chosenDateCallback: (date: Date) => void;
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