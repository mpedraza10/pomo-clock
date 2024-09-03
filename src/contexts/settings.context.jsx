// React imports
import { createContext, useState } from "react";

// Prop types import
import PropTypes from "prop-types";

// Default timer settings (min * 60 to turn into seconds)
const TIMER_SETTINGS = {
	work: { minutes: 25 },
	sbreak: { minutes: 5 },
	lbreak: { minutes: 15 },
};

export const SettingsContext = createContext({
	timerSettings: TIMER_SETTINGS,
	setTimerSettings: () => {},
});

export const SettingsProvider = ({ children }) => {
	const [timerSettings, setTimerSettings] = useState(TIMER_SETTINGS);
	const value = { timerSettings, setTimerSettings };

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	);
};

SettingsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
