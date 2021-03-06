import React, {Component} from 'react';
import './DatePage.css';
import DatePicker, {IDatePicker} from "../../Components/DatePicker/DatePicker";



interface IStateDataPage extends  IDatePicker.GeneralIStateDatePicker {

}

class DatePage extends Component<{}, IStateDataPage> {

	constructor(props: {}) {
		super(props);
		this.state = {
			chosenDate: {possibleYears: []}
		}
	}

	updateDateObject = (date: IDatePicker.Date) => {
		this.setState({chosenDate: date})
	};

	render() {
		return (
			<div className={'DatePage-wrapper'}>
				<DatePicker chosenDateCallback={this.updateDateObject}/>
				<pre>
					{JSON.stringify(this.state.chosenDate, null, 4)}
				</pre>
			</div>
		);
	}
}

export default DatePage;