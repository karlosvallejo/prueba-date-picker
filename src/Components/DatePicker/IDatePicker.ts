export interface GeneralIStateDatePicker {
    chosenDate: Date;
}

export interface IStateDatePicker extends GeneralIStateDatePicker{
	currentYear: number;
	currentMonth: number;
	daysForHighlight: Array<number> | null;
	dropDownElements: ('YEARS' | 'MONTHS') | null;
	showDropDown: boolean;
	dropDownIsHidden: boolean;
	rangeSelection: rangeSelection;
}

export interface IPropsDatePicker {
	chosenDateCallback: (date: Date) => void;
}

interface rangeSelection {
	rangeSelectionActive: boolean;
	rangeSelectionSecondPickResolver: (currentDay: number) => void;
	rangeSelectionFirstSelection: Year | null;
	rangeSelectionSecondSelection: Year | null;
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

const exampleDate: Date = {
	possibleYears: [
		{
			year: 1999, possibleMonths: [
				{
					month: 10, days: [4, 5, 6]
				},
				{
					month: 12, days: [29, 30, 31]
				},
			]
		},
		{
			year: 2000, possibleMonths: [
				{
					month: 1, days: [10, 16, 25]
				}
			]
		}
	]
};