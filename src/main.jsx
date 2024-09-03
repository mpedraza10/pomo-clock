// React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

// React router dom imports
import { BrowserRouter } from "react-router-dom";

// Context
import { UserProvider } from "./contexts/user.context";
import { SettingsProvider } from "./contexts/settings.context.jsx";

// Components
import App from "./App.jsx";

// Styles
import "./index.scss";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<UserProvider>
				<SettingsProvider>
					<App />
					<Analytics />
				</SettingsProvider>
			</UserProvider>
		</BrowserRouter>
	</StrictMode>
);
