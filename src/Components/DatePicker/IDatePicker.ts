export interface GeneralIStateDatePicker {
    chosenDate: Date | null;
}

const f2 = {
	possibleYears: {
		1999: {
			possibleMonths: {
				10: {
					days: [10,12,11]
				},
				12: {
					days: [5, 8, 9]
				}
			}
		},
		2000: {
			possibleMonths: {
				1: {
					days: [1,2,3,4,5,6]
				}
			}
		}
	}
};

export interface IStateDatePicker extends GeneralIStateDatePicker{
	currentYear: number;
	currentMonth: number;
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