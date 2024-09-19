/* eslint-disable react/prop-types */

// Styles
import "./report-data-card.styles.scss";

const ReportDataCard = ({ type, todaysData, Icon, description }) => {
	return (
		<li className="report-data-card">
			<Icon />
			<span className="data">
				{todaysData
					? type === "today-work"
						? todaysData.workedHours < 1
							? `${Math.floor(todaysData.workedMinutes ?? 0)}`
							: `${Math.floor(todaysData.workedHours ?? 0)}`
						: `${
								todaysData.sumOfWorkedHoursInWeek < 1
									? todaysData.sumOfWorkedMinutesInWeek ?? 0
									: todaysData.sumOfWorkedHoursInWeek ?? 0
						  }`
					: "--"}
			</span>
			<span className="desc">
				{todaysData
					? type === "today-work"
						? `${
								todaysData.workedHours < 1 ? "Minutes" : "Hours"
						  } ${description}`
						: `${
								todaysData.sumOfWorkedHoursInWeek < 1 ? "Minutes" : "Hours"
						  } ${description}`
					: "--"}
			</span>
		</li>
	);
};

export default ReportDataCard;
