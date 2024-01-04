import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { ReactFlowProvider } from "reactflow";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={store}>
		<ReactFlowProvider>
			<App />
		</ReactFlowProvider>
	</Provider>,
);
