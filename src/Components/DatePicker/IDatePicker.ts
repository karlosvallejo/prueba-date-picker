export interface GeneralIStateDatePicker {
    chosenDate: Date;
}

export interface IStateDatePicker extends GeneralIStateDatePicker{
	currentYear: number;
	currentMonth: number;
	daysForHighlight: Array<number> | null;
}

export interface IPropsDatePicker {
	chosenDateCallback: (date: Date) => void;
}

export interface Date {
	possibleYears: Year[];
}

export interface Year {
	year: number;
	possibleMonths: Month[];
}

export interface Month {
	month: number;
	days: number[];
}