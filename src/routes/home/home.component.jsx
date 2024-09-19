// React imports
import { Fragment, useContext, useEffect, useState } from "react";

// Context
import { SettingsContext } from "../../contexts/settings.context";
import { UserContext } from "../../contexts/user.context";

// Components
import Nav from "../../components/nav/nav.component";
import Timer from "../../components/timer/timer.component";
import MotivationText from "../../components/motivation-text/motivation-text.component";

const Home = () => {
	// ---------------------------------------------- State ----------------------------------------------
	const [isDone, setIsDone] = useState(false);
	const [workCount, setWorkCount] = useState(1);

	const { currentTimer, setCurrentTimer } = useContext(UserContext);
	const { timerSettings } = useContext(SettingsContext);

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
		<Fragment>
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
					<Nav />
					{currentTimer === "work" ? (
						<Timer minutes={timerSettings.work.minutes} setIsDone={setIsDone} />
					) : currentTimer === "sbreak" ? (
						<Timer
							minutes={timerSettings.sbreak.minutes}
							setIsDone={setIsDone}
						/>
					) : (
						<Timer
							minutes={timerSettings.lbreak.minutes}
							setIsDone={setIsDone}
						/>
					)}
				</div>
				<MotivationText workCount={workCount} />
			</main>
		</Fragment>
	);
};

export default Home;
