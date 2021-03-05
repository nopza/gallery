import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import * as loginActions from "./actions/login.action";

import LoginPage from "./components/pages/LoginPage/LoginPage";
import HomePage from "./components/pages/HomePage/HomePage";
import Navbar from "./components/layouts/Navbar";
import Navbar2 from "./components/layouts/Navbar2";
import Footer from "./components/layouts/Footer";
import GalleryCreatePage from "./components/pages/GalleryCreatePage/GalleryCreatePage";
import GalleryEditPage from "./components/pages/GalleryEditPage/GalleryEditPage";
import GalleryViewPage from "./components/pages/GalleryViewPage/GalleryViewPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import { Container, makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Scroll from "./components/layouts/Scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "125px",
    // backgroundColor: "#93a1ae",
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#edc218" },
  },
  status: {
    danger: "orange",
  },
});

function App() {
  const classes = useStyles();

  // Protected Route
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition
        loginActions.isLoggedIn() ? (
          <Redirect to="/" />
        ) : (
          <LoginPage {...props} />
        )
      }
    />
  );

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Scroll showBelow={250} />
        <Navbar />
        {loginActions.isLoggedIn() && (
          <>
            <Navbar2 />
          </>
        )}
        <Container className={classes.root}>
          <Switch>
            <LoginRoute path="/login" exact={true} component={LoginPage} />
            <Route path="/" exact={true} component={HomePage} />
            <SecuredRoute
              path="/gallery/create"
              exact={true}
              component={GalleryCreatePage}
            />
            <SecuredRoute
              path="/mygallery"
              exact={true}
              component={GalleryViewPage}
            />
            <SecuredRoute
              path="/gallery/edit/:id"
              component={GalleryEditPage}
            />
            <Route path="/register" exact={true} component={RegisterPage} />
            <Route
              exact={true}
              path="/"
              component={() => <Redirect to="/" />}
            />
          </Switch>
        </Container>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
