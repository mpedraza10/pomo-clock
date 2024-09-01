/* eslint-disable react/prop-types */

// React imports
import { Fragment } from "react";

// Styles
import "./app-settings.styles.scss";

const AppSettings = ({ closeModal, timerSettings, setTimerSettings }) => {
	// Helper functions
	const handleChange = (e) => {
		const { name, value } = e.target;

		// Convert value to a number, which automatically removes leading zeros
		let validatedValue = parseInt(value, 10);

		// Handle the case where value is not a number (e.g., empty input)
		if (isNaN(validatedValue)) {
			validatedValue = "";
		} else if (validatedValue > 99) {
			validatedValue = 99;
		}

		setTimerSettings({
			...timerSettings,
			[name]: { ...timerSettings[name], minutes: validatedValue },
		});
	};

	return (
		<Fragment>
			<div className="settings-title-container">
				<h2 className="title">Settings</h2>
			</div>
			<div className="setting-section">
				<h3 className="setting-section-title">Timer settings</h3>
				<p className="setting-section-description">
					Set preferred time in minutes.
				</p>
				<div className="timer-settings">
					<div className="timer-setting">
						<span className="timer-setting-title">Work</span>
						<input
							type="number"
							step="1"
							name="work"
							className="timer-setting-input"
							value={timerSettings.work.minutes}
							onChange={handleChange}
						/>
					</div>
					<div className="timer-setting">
						<span className="timer-setting-title">Short break</span>
						<input
							type="number"
							step="1"
							name="sbreak"
							className="timer-setting-input"
							value={timerSettings.sbreak.minutes}
							onChange={handleChange}
						/>
					</div>
					<div className="timer-setting">
						<span className="timer-setting-title">Long break</span>
						<input
							type="number"
							step="1"
							name="lbreak"
							className="timer-setting-input"
							value={timerSettings.lbreak.minutes}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="setting-section">
				<button onClick={closeModal} className="btn save-settings-btn">
					Done
				</button>
			</div>
		</Fragment>
	);
};

export default AppSettings;
