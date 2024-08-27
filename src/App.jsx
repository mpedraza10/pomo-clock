// React imports
import { useState } from "react";

// Components
import Nav from "./components/nav/nav.component";
import Timer from "./components/timer/timer.component";

// Default timer settings
const defaultTimerSettings = {
	workTime: 1 * 60,
	shortBreakTime: 5 * 60,
	longBreakTime: 15 * 60,
};

const App = () => {
	const [timerSettings, setTimerSettings] = useState(defaultTimerSettings);
	const [currentTimer, setCurrentTimer] = useState("work");

	return (
		<main>
			<Nav setCurrentTimer={setCurrentTimer} />

			{currentTimer === "work" ? (
				<Timer minutes={timerSettings.workTime} currentTimer={currentTimer} />
			) : currentTimer === "sbreak" ? (
				<Timer
					minutes={timerSettings.shortBreakTime}
					currentTimer={currentTimer}
				/>
			) : (
				<Timer
					minutes={timerSettings.longBreakTime}
					currentTimer={currentTimer}
				/>
			)}
		</main>
	);
};

export default App;
