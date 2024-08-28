// React imports
import { useEffect, useState } from "react";

// Components
import Nav from "./components/nav/nav.component";
import Timer from "./components/timer/timer.component";
import MotivationText from "./components/motivation-text/motivation-text.component";

// Default timer settings (min * 60 to turn into seconds)
const TIMER_SETTINGS = {
	work: { minutes: 1 },
	sbreak: { minutes: 1 },
	lbreak: { minutes: 1 },
};

const App = () => {
	// ---------------------------------------------- State ----------------------------------------------
	const [timerSettings, setTimerSettings] = useState(TIMER_SETTINGS);
	const [currentTimer, setCurrentTimer] = useState("work");
	const [isDone, setIsDone] = useState(false);
	const [workCount, setWorkCount] = useState(1);

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
		<main
			className={`main-container ${
				currentTimer === "work"
					? "red-bg"
					: currentTimer === "sbreak"
					? "light-blue-bg"
					: "dark-blue-bg"
			}`}
		>
			<div
				className={`content-container ${
					currentTimer === "work"
						? "red-bg"
						: currentTimer === "sbreak"
						? "light-blue-bg"
						: "dark-blue-bg"
				}`}
			>
				<Nav currentTimer={currentTimer} setCurrentTimer={setCurrentTimer} />
				{currentTimer === "work" ? (
					<Timer
						minutes={timerSettings.work.minutes}
						currentTimer={currentTimer}
						setIsDone={setIsDone}
					/>
				) : currentTimer === "sbreak" ? (
					<Timer
						minutes={timerSettings.sbreak.minutes}
						currentTimer={currentTimer}
						setIsDone={setIsDone}
					/>
				) : (
					<Timer
						minutes={timerSettings.lbreak.minutes}
						currentTimer={currentTimer}
						setIsDone={setIsDone}
					/>
				)}
			</div>
			<MotivationText workCount={workCount} currentTimer={currentTimer} />
		</main>
	);
};

export default App;
