//import hook
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

//import component
import { router } from "./App";

//import libaries
import store from "./components/globalstate/store";
import { Provider } from "react-redux";

//import css
import "bootstrap/dist/css/bootstrap.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
