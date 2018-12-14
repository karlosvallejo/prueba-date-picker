import React, {Component} from 'react';
import IDatePicker from "./IDatePicker";



class DatePicker extends Component<{}, IDatePicker.IStateDatePicker> {

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

	constructor(props: {}) {
		super(props);
		this.state = {
			chosenDate: null
		};
	}

	componentDidMount() {
		this.setState({chosenDate: this.exampleDate})
	}

	render() {
        return (
        	
            <pre>
	            {JSON.stringify(this.state.chosenDate, null, 4)}
            </pre>
        );
    }
}

export default DatePicker;