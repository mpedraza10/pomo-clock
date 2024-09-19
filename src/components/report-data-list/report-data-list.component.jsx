/* eslint-disable react/prop-types */

// Components
import ReportDataCard from "../report-data-card/report-data-card.component";

// Svgs
import ClockSvg from "../svgs/clockSvg.svg";
import CalendarSvg from "../svgs/calendarSvg.svg";

// Styles
import "./report-data-list.styles.scss";

const ReportDataList = ({ todaysData }) => {
	return (
		<ul className="report-data-list">
			<ReportDataCard
				type="today-work"
				todaysData={todaysData}
				Icon={ClockSvg}
				description="worked today"
			/>
			<ReportDataCard
				type="week-work"
				todaysData={todaysData}
				Icon={CalendarSvg}
				description="worked this week"
			/>
		</ul>
	);
};

export default ReportDataList;
