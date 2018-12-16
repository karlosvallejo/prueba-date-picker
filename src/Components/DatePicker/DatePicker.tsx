import React, {Component} from 'react';
import { cloneDeep, isEqual } from 'lodash';
import './DatePicker.css';
import * as IDatePicker from "./IDatePicker";
import moment from 'moment';
export {IDatePicker};

class DatePicker extends Component<IDatePicker.IPropsDatePicker, IDatePicker.IStateDatePicker> {


	constructor(props: IDatePicker.IPropsDatePicker) {
		super(props);
		this.state = {
			chosenDate: {possibleYears: []},
			currentYear: new Date().getFullYear(),
			currentMonth: new Date().getMonth() + 1,
			daysForHighlight: null,
			rangeSelection: {rangeSelectionActive: false,  rangeSelectionSecondPickResolver: this.handleRangePick.bind(this), rangeSelectionFirstSelection: null, rangeSelectionSecondSelection: null}
		};
	}

	componentDidMount() {
		/*
		this.setState({chosenDate: this.exampleDate}, () => {
				this.props.chosenDateCallback(this.state.chosenDate);
		});
		*/
	}

	componentDidUpdate(prevProps: Readonly<IDatePicker.IPropsDatePicker>, prevState: Readonly<IDatePicker.IStateDatePicker>, snapshot?: any) {
		const daysToDisplay = this.getDisplayDays();
		if (!isEqual(this.state.daysForHighlight, daysToDisplay)) {
			this.setState({daysForHighlight: daysToDisplay});
		}

		if (!isEqual(prevState.chosenDate, this.state.chosenDate)) {
			this.props.chosenDateCallback(this.state.chosenDate);
		}
	}

	getNumbersOfDaysFromMonth(monthNumber: number): number {
		let days: number = 20;
		switch (monthNumber) {
			case 1:
				days = 31;
				break;

			case 2:
				days = 28;
				break;

			case 3:
				days = 31;
				break;

			case 4:
				days = 30;
				break;

			case 5:
				days = 31;
				break;

			case 6:
				days = 30;
				break;

			case 7:
				days = 31;
				break;

			case 8:
				days = 31;
				break;

			case 9:
				days = 30;
				break;

			case 10:
				days = 31;
				break;

			case 11:
				days = 30;
				break;

			case 12:
				days = 31;
				break;
		}
		return days;
	}

	generateDays(monthNumber: number): JSX.Element[] {
		let totalDays: number = this.getNumbersOfDaysFromMonth(monthNumber);

		return [...Array<JSX.Element>(totalDays)].map((val, index) => {
            return <div key={index + 1} className={this.state.daysForHighlight && this.state.daysForHighlight.includes(index + 1)? 'DatePicker-days-day DatePicker-days-day--active': 'DatePicker-days-day'} onClick={this.state.rangeSelection.rangeSelectionActive? (event: React.MouseEvent<HTMLDivElement>) => this.state.rangeSelection.rangeSelectionSecondPickResolver(index + 1) : (event: React.MouseEvent<HTMLDivElement>) => this.updateChosenDate(index + 1, event)}><p>{index + 1}</p></div>
		})
	}

	generateYears(min: number, max: number): JSX.Element[] {
		const yearsOptions: JSX.Element[] = [];
		for (let index = min; index <= max; index++) {
			yearsOptions.push(<option key={index} value={index}>{index}</option>);
		}
        return yearsOptions;
	}

    generateMonths(): JSX.Element[] {
        return [...Array<JSX.Element>(12)].map((val: JSX.Element, index: number) => {
        	const monthName: string = this.nameMonth(index + 1);
        	return <option key={monthName} value={index + 1}>{monthName}</option>
        });
    }

	nameMonth(index: number): string {
		switch (index) {
			case 1:
				return 'Enero';
			case 2:
				return 'Febrero';
			case 3:
				return 'Marzo';
			case 4:
				return 'Abril';
			case 5:
				return 'Mayo';
			case 6:
				return 'Junio';
			case 7:
				return 'Julio';
			case 8:
				return 'Agosto';
			case 9:
				return 'Septiembre';
			case 10:
				return 'Octubre';
			case 11:
				return 'Noviembre';
			case 12:
				return 'Diciembre';
		}
		return 'Wrong Month';
	}

	updateChosenDate(i : number, event: React.MouseEvent<HTMLDivElement>) {
		this.setState({chosenDate: this.determineNewDate({year: this.state.currentYear, possibleMonths: [{month: this.state.currentMonth, days: [i]}]}, this.state.chosenDate)});
	}

	determineNewDate(yearForInsert: IDatePicker.Year, targetDate: IDatePicker.Date): IDatePicker.Date {
			const chosenDate = cloneDeep(targetDate);
			const currentYear = yearForInsert.year;
			const currentMonth = yearForInsert.possibleMonths[0].month;
			const selectedDay = yearForInsert.possibleMonths[0].days[0];
			let yearFound: boolean = false;
			let monthFound: boolean = false;
			chosenDate.possibleYears.forEach(year => {
				if (year.year === currentYear) {
					yearFound = true;
					year.possibleMonths.forEach(month => {
						if (month.month === currentMonth) {
							monthFound = true;
							month.days = Array.from(new Set([...month.days ,...[selectedDay]])).sort((a, b) => a - b);
						}
					}) ;
				}
			});

			if (!yearFound) {
				//year no found, add year object
				const year: IDatePicker.Year = this.buildYearObject(currentYear, currentMonth, selectedDay);
				chosenDate.possibleYears.push(year);
			} else if (!monthFound) {
				//year found, but no month. Add month object yo the current year
				const month: IDatePicker.Month = {month: currentMonth, days: [selectedDay]};
				chosenDate.possibleYears.forEach((year) => {
					if (year.year === currentYear) {
						year.possibleMonths.push(month);
					}
				});
			}
			return chosenDate;
	}

	buildYearObject(currentYear: number, currentMonth: number, selectedDay: number): IDatePicker.Year {
		return {year: currentYear, possibleMonths: [{month: currentMonth, days: [selectedDay]}]}
	}

	handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
		let currentYear = cloneDeep(this.state.currentYear);
		let currentMonth = cloneDeep(this.state.currentMonth);
		const id = event.target.id;
        const value = parseInt(event.target.value);
        console.log(id);
		switch (id) {
			case 'years':
				currentYear = value;
			break;
			case 'months':
				currentMonth = value;
			break;
        }
        this.setState({currentYear: currentYear, currentMonth: currentMonth})
	}

	getDisplayDays (): number[] | null {
		const chosenDate = cloneDeep(this.state.chosenDate);
		let daysForDisplay: number[] | null = null;
		chosenDate.possibleYears.forEach((year) => {
			if (year.year === this.state.currentYear) {
				year.possibleMonths.forEach((month) => {
					if (month.month === this.state.currentMonth) {
						daysForDisplay = month.days;
					}
				})
			}
		});
		return daysForDisplay;
	}

	handleButtonRangeSelection(event: React.MouseEvent<HTMLButtonElement>, isRange: boolean) {
		const rangeSelection = cloneDeep(this.state.rangeSelection);
		Object.assign(rangeSelection, {rangeSelectionActive: isRange});
		this.setState({rangeSelection: rangeSelection});
	}

	handleRangePick(currentDay: number) {
		const rangeSelection = cloneDeep(this.state.rangeSelection);
		let firstPick: IDatePicker.Year;
		let secondPick: IDatePicker.Year;
		firstPick = this.buildYearObject(cloneDeep(this.state.currentYear), cloneDeep(this.state.currentMonth), currentDay);
		new Promise<number>((resolve, reject) => {
			Object.assign(rangeSelection, {rangeSelectionSecondPickResolver: resolve});
			this.setState({rangeSelection: rangeSelection});
		}).then((secondCurrentDay: number) => {
			secondPick = this.buildYearObject(cloneDeep(this.state.currentYear), cloneDeep(this.state.currentMonth), secondCurrentDay);
			Object.assign(rangeSelection, {rangeSelectionSecondPickResolver: this.handleRangePick.bind(this)});
			this.setState({rangeSelection: rangeSelection},() => {
				this.makeRange(firstPick, secondPick);
			});
		});
	}

	makeRange(firstPick: IDatePicker.Year, secondPick: IDatePicker.Year) {
		const firstDay = moment(`${firstPick.possibleMonths[0].days[0]}/${firstPick.possibleMonths[0].month}/${firstPick.year}`, 'DD/MM/YYYY');
		const secondDay = moment(`${secondPick.possibleMonths[0].days[0]}/${secondPick.possibleMonths[0].month}/${secondPick.year}`, 'DD/MM/YYYY');
		let totalDays = secondDay.diff(firstDay, 'days');
		const currentDay = cloneDeep(firstPick);
		const yearsArray: IDatePicker.Year[] = [];
		yearsArray.push(cloneDeep(currentDay));

		while (totalDays > 0) {
			if ((currentDay.possibleMonths[0].days[0] + 1) <= this.getNumbersOfDaysFromMonth(currentDay.possibleMonths[0].month)) {
				// Next Day
				currentDay.possibleMonths[0].days[0]++;
				yearsArray.push(cloneDeep(currentDay));
			} else if ((currentDay.possibleMonths[0].month + 1) <= 12) {
				// Next Month
				currentDay.possibleMonths[0].month++;
				currentDay.possibleMonths[0].days[0] = 1;
				yearsArray.push(cloneDeep(currentDay));
			} else {
				// Next Year
				currentDay.year++;
				currentDay.possibleMonths[0].month = 1;
				currentDay.possibleMonths[0].days[0] = 1;
				yearsArray.push(cloneDeep(currentDay));
			}

			totalDays--;
		}
		let newDate: IDatePicker.Date = cloneDeep(this.state.chosenDate);
		yearsArray.forEach((year: IDatePicker.Year) => {
			newDate = this.determineNewDate(year, newDate);
		});
		this.setState( {chosenDate: cloneDeep(newDate)});
	}

	render() {
        return (
        	<div className={'DatePicker-wrapper'}>
					<div className={'DatePicker-selectors-wrapper'}>
	                    <select name={'years'} id={'years'} value={this.state.currentYear} onChange={this.handleSelect.bind(this)}>
							{this.generateYears(1998, 2025)}
						</select>
	                    <select name={'months'} id={'months'} value={this.state.currentMonth} onChange={this.handleSelect.bind(this)}>
	                        {this.generateMonths()}
	                    </select>
						<button type={'button'} disabled={this.state.rangeSelection.rangeSelectionActive} onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.handleButtonRangeSelection(event, true)}>Range Selection</button>
						<button type={'button'} disabled={!this.state.rangeSelection.rangeSelectionActive} onClick={(event: React.MouseEvent<HTMLButtonElement>) => this.handleButtonRangeSelection(event, false)}>Single Selection</button>
					</div>
		            <div className={'DatePicker-inferiorSection-wrapper'}>
						<div className={'DatePicker-inferiorSection-days-wrapper'}>
								{this.generateDays(this.state.currentMonth)}
						</div>
			            <div className={'DatePicker-inferiorSection-yearsOptions-wrapper'}>

			            </div>
		            </div>
	        </div>
        );
    }
}

export default DatePicker;