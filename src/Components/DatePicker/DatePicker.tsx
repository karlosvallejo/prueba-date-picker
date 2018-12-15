import React, {Component} from 'react';
import './DatePicker.css';
import * as IDatePicker from "./IDatePicker";
export {IDatePicker};

class DatePicker extends Component<IDatePicker.IPropsDatePicker, IDatePicker.IStateDatePicker> {

	exampleDate: IDatePicker.Date = {
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

	constructor(props: IDatePicker.IPropsDatePicker) {
		super(props);
		this.state = {
			chosenDate: null,
			currentYear: 2018,
			currentMonth: 12
		};
	}

	componentDidMount() {
		this.setState({chosenDate: this.exampleDate}, () => {
			if (this.state.chosenDate) {
				this.props.chosenDateCallback(this.state.chosenDate);
			}
		});
	}

	generateDays(monthNumber: number, handler:(i: number, event: React.MouseEvent<HTMLDivElement>) => void): JSX.Element[] {
		let totalDays: number = 20;
		switch (monthNumber) {
			case 1:
				totalDays = 31;
			break;

			case 2:
				totalDays = 28;
			break;

			case 3:
				totalDays = 31;
			break;

			case 4:
				totalDays = 30;
			break;

			case 5:
				totalDays = 31;
			break;

			case 6:
				totalDays = 30;
			break;

			case 7:
				totalDays = 31;
			break;

			case 8:
				totalDays = 31;
			break;

			case 9:
				totalDays = 30;
			break;

			case 10:
				totalDays = 31;
			break;

			case 11:
				totalDays = 30;
			break;

			case 12:
				totalDays = 31;
			break;
        }

		return [...Array<JSX.Element>(totalDays)].map((val, index) => {
            return <div key={index + 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handler(index + 1, event)}>{index + 1}</div>
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

	defineChosenDate(i : number, event: React.MouseEvent<HTMLDivElement>) {

	}

	determineNewDate() {
		const { chosenDate } = this.state;
		if (chosenDate) {
			chosenDate.possibleYears.forEach((yearObject: IDatePicker.Year) => {
				if (yearObject.year === this.state.currentYear) {

				}
			});
		}

		function createYearObject(): IDatePicker.Year {
			return 4 as any;
		}
	}

	handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
		const id = event.target.id;
        const value = parseInt(event.target.value);
        console.log(id);
		switch (id) {
			case 'years':
                this.setState({currentYear: value});
			break;
			case 'months':
				this.setState({currentMonth: value});
			break;
        }
	}

	render() {
        return (
        	<div className={'DatePicker-wrapper'}>
				<div>
                    <select name={'years'} id={'years'} value={this.state.currentYear} onChange={this.handleSelect.bind(this)}>
						{this.generateYears(1998, 2025)}
					</select>
                    <select name={'months'} id={'months'} value={this.state.currentMonth} onChange={this.handleSelect.bind(this)}>
                        {this.generateMonths()}
                    </select>
					{this.generateDays(this.state.currentMonth, this.defineChosenDate)}
                </div>
	        </div>
        );
    }
}

export default DatePicker;