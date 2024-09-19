// React imports
import { useContext, useState, useEffect } from "react";

// React router dom imports
import { Link } from "react-router-dom";

// Recharts imports
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

// Context
import { UserContext } from "../../contexts/user.context";

// Firebase utils imports
import { getThisWeekUserReportData } from "../../utils/firebase/firebase.utils";

// Utils imports
import { getTodaysDate } from "../../utils/constants";

// Components
import Button from "../../components/button/button.component";

// Styles
import "./report.styles.scss";

const Report = () => {
	// State
	const { currentUser, currentUserData } = useContext(UserContext);
	const [todaysData, setTodaysData] = useState({});
	const [weekData, setWeekData] = useState([]);
	const todaysDate = getTodaysDate();

	useEffect(() => {
		const getWeekAndTodaysData = async () => {
			const data = await getThisWeekUserReportData(currentUser);
			setWeekData(data);

			// If we have retrieved todays data then gets todays data
			if (data && data.length) {
				// Get the sum of all hours worked in the week until today
				let sumOfWorkedHoursInWeek = 0;
				let sumOfWorkedMinutesInWeek = 0;
				for (let entry of data) {
					if (entry.date === todaysDate) {
						sumOfWorkedHoursInWeek += entry.workedHours;
						sumOfWorkedMinutesInWeek += entry.workedMinutes;
						break;
					}
					sumOfWorkedHoursInWeek += entry.workedHours;
					sumOfWorkedMinutesInWeek += entry.workedMinutes;
				}

				const tdata = data.find((data) => data.date === todaysDate);
				setTodaysData({
					...tdata,
					sumOfWorkedHoursInWeek: sumOfWorkedHoursInWeek.toFixed(2),
					sumOfWorkedMinutesInWeek: sumOfWorkedMinutesInWeek.toFixed(2),
				});
			}
		};

		getWeekAndTodaysData();
	}, [currentUser, todaysDate]);

	return (
		<main className="report-page-container">
			{currentUser ? (
				<div className="report-container">
					<div className="report-content">
						<h2>
							Welcome back, {currentUserData && currentUserData.displayName}!
						</h2>
						<p>
							Today you&apos;ve worked{" "}
							{todaysData &&
								(todaysData.workedHours < 1
									? `${todaysData.workedMinutes} minutes`
									: `${todaysData.workedHours} ${
											todaysData.workedHours <= 1.0 ? "hour" : "hours"
									  }`)}
							! And this week you&apos;ve worked{" "}
							{todaysData &&
								`${
									todaysData.sumOfWorkedHoursInWeek < 1
										? todaysData.sumOfWorkedMinutesInWeek
										: todaysData.sumOfWorkedHoursInWeek
								} ${
									todaysData.sumOfWorkedHoursInWeek < 1
										? todaysData.sumOfWorkedMinutesInWeek <= 1
											? "minute"
											: "minutes"
										: todaysData.sumOfWorkedHoursInWeek <= 1
										? "hour"
										: "hours"
								}`}
							! Every minute brings you closer to your goals. Keep up the
							fantastic effort, you&apos;ve got this!
						</p>
					</div>
					<div className="charts-container">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								width="100%"
								data={weekData}
								margin={{
									top: 5,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="white"
									fill="hsl(3, 92%, 80%)"
								/>
								<XAxis dataKey="day" tick={{ fill: "white" }} stroke="white" />
								<YAxis tick={{ fill: "white" }} stroke="white" />
								<Tooltip />
								<Legend />
								<Bar
									name="Worked Hours"
									dataKey="workedHours"
									fill="hsl(3, 92%, 50%)"
									activeBar={<Rectangle fill="hsl(3, 92%, 50%)" />}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			) : (
				<div className="no-auth-container">
					<h2>
						Sign in to keep track of your working hours and generate reports
					</h2>
					<Link to="/auth">
						<Button buttonType="inverted">Sign in</Button>
					</Link>
				</div>
			)}
		</main>
	);
};

export default Report;
