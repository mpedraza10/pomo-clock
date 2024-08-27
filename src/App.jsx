// React imports
import { useEffect, useState } from "react";

// Components
import Nav from "./components/nav/nav.component";
import Timer from "./components/timer/timer.component";

// Default timer settings (min * 60 to turn into seconds)
const TIMER_SETTINGS = {
	work: { time: 30 * 60 },
	sbreak: { time: 5 * 60 },
	lbreak: { time: 15 * 60 },
};

const App = () => {
	// ---------------------------------------------- State ----------------------------------------------
	const [timerSettings, setTimerSettings] = useState(TIMER_SETTINGS);
	const [currentTimer, setCurrentTimer] = useState("work");
	const [isDone, setIsDone] = useState(false);
	const [workCount, setWorkCount] = useState(4);

	// ---------------------------------------------- Effects ----------------------------------------------

	// Effect to check if we need to change the timer when it finishes
	useEffect(() => {
		// Check if we are done with a timer
		if (isDone) {
			// Then check where we need to update the view
			if (currentTimer === "work" && workCount < 4) {
				setCurrentTimer("sbreak");
				setWorkCount(workCount + 1);
			} else if (currentTimer === "work" && workCount >= 4) {
				setCurrentTimer("lbreak");
				setWorkCount(1);
			} else if (currentTimer === "sbreak" || currentTimer === "lbreak") {
				setCurrentTimer("work");
			}

			setIsDone(false);
		}
	}, [isDone]);

	return (
		<main>
			<Nav setCurrentTimer={setCurrentTimer} />
			{currentTimer === "work" ? (
				<Timer
					minutes={timerSettings.work.time}
					currentTimer={currentTimer}
					setIsDone={setIsDone}
				/>
			) : currentTimer === "sbreak" ? (
				<Timer
					minutes={timerSettings.sbreak.time}
					currentTimer={currentTimer}
					setIsDone={setIsDone}
				/>
			) : (
				<Timer
					minutes={timerSettings.lbreak.time}
					currentTimer={currentTimer}
					setIsDone={setIsDone}
				/>
			)}
		</main>
	);
};

export default App;
