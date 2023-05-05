import React, { Fragment, useEffect, useState, memo, useRef } from 'react';
import moment from 'moment';
import './index.css';

/**
 * This method is used to convert date to custom format
 * @param {Date} date - Date object or timestamp
 * @param {String} format - Moment format string
 * @returns 
 */
const convertToCustomFormat = ({
	date = Date.now(),
	format = "YYYY-MM-DD"
}) => {
	let result = "";
	try {
		let tempDate = new Date(date);
		if (tempDate instanceof Date) result = moment(tempDate).format(format);
	} catch (err) {
		console.error("Exception occurred in convertToCustomFormat -- ", err);
	}
	return result;
}

function App({
	value = convertToCustomFormat(Date.now()),
	format = "YYYY/MM/DD"
}) {
	const [isInEditMode, setIsInEditMode] = useState(false);
	const [dateInputValue, setDateInputValue] = useState();
	const [textInputValue, setTextInputValue] = useState("");
	let dateElementRef = useRef();

	// Fires when user clicks on either text input box or calendar icon
	const handleClick = () => setIsInEditMode(true)

	// Fires when user selects the date
	const handleChange = event => {
		try {
			let newValue = event.target.value;
			setTextInputValue(convertToCustomFormat({ date: newValue, format }));
			setDateInputValue(convertToCustomFormat({ date: newValue, format: "YYYY-MM-DD" }));
			setIsInEditMode(false);
		} catch (err) {
			console.error("Exception occurred in handleChange -- ", err);
		}
	}

	useEffect(() => {
		try {
			if (isInEditMode
				&& dateElementRef.current) {
				window.setTimeout(() => {
					if ("showPicker" in HTMLInputElement.prototype)
						dateElementRef.current.showPicker();

					// Safari doesn't support showPicker
					dateElementRef.current.click(); 
				}, 100)
			}
		} catch (err) {
			console.error("Exception occurred in useEffect[isInEditMode] -- ", err);
		}
	}, [isInEditMode])

	useEffect(() => {
		try {
			let date = new Date(value);
			if (date instanceof Date
				&& format) {
				setDateInputValue(convertToCustomFormat({ date }));
				setTextInputValue(convertToCustomFormat({ date, format }));
			}
		} catch (err) {
			console.error("Exception occurred in useEffect[value, format] --  -- ", err);
		}
	}, [value, format]);

	return <Fragment>
		{
			isInEditMode
			&& <input
				type="date"
				id="custom-format-date-input"
				ref={dateElementRef}
				onChange={handleChange}
				value={dateInputValue}
				custom-format-value={textInputValue} />
		}
		{
			!isInEditMode
			&& <span style={{ position: "relative" }}>
				<input id="custom-format-text-input" type="text" onClick={handleClick} value={textInputValue} onInput={handleClick} onChange={() => {}} />
				<span style={{ position: "absolute", right: "4px", top: "2px" }} onClick={handleClick}>
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="WindowText" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
				</span>
			</span>
		}
	</Fragment>
}

export default memo(App);