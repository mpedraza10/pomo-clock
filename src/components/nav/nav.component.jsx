/* eslint-disable react/prop-types */

const Nav = ({ setCurrentTimer }) => {
	// Helper functions
	const handleTimerSelection = (e) => setCurrentTimer(e.target.value);

	return (
		<nav>
			<ul>
				<li>
					<button onClick={handleTimerSelection} value="work">
						Work
					</button>
				</li>
				<li>
					<button onClick={handleTimerSelection} value="sbreak">
						Short Break
					</button>
				</li>
				<li>
					<button onClick={handleTimerSelection} value="lbreak">
						Long Break
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
