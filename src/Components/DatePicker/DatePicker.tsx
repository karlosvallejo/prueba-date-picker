import React, {Component} from 'react';
import './DatePicker.css';
import * as IDatePicker from "./IDatePicker";
export {IDatePicker};

class DatePicker extends Component<IDatePicker.IPropsDatePicker, IDatePicker.IStateDatePicker> {

	exampleDate: IDatePicker.Date= {
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
			chosenDate: null
		};
	}

	componentDidMount() {
		this.setState({chosenDate: this.exampleDate}, () => {
			if (this.state.chosenDate) {
				this.props.chosenDateCallback(this.state.chosenDate);
			}
		});
	}

	render() {
        return (
        	<div className={'DatePicker-wrapper'}>

	        </div>
        );
    }
}

export default DatePicker;