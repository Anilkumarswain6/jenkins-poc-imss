/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable import/no-unresolved */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// import "../node_modules/bootst"
// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";
// eslint-disable-next-line prettier/prettier
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux";
import store from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"


const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
