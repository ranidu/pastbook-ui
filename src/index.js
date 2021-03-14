import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./reducers/imagesReducer";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import ImageContainer from "./containers/imageContainer";
import logger from "redux-logger";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(imageReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <div className="App">
      <Nav>
        <img
          className="App-logo"
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt=""
        />
      </Nav>
      <Container>
        <ImageContainer />
      </Container>
    </div>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
