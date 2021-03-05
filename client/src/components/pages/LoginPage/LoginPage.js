import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "formik-material-ui";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as loginActions from "./../../../actions/login.action";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { CardActionArea, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "92px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  // useEffect(() => {
  //   loginActions.isLoggedIn() && props.history.push("/stock");
  // }, []);

  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <Form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Field
          variant="outlined"
          margin="normal"
          required
          component={TextField}
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          name="username"
          type="text"
          disabled={loginReducer.isFetching}
        />
        <Field
          variant="outlined"
          margin="normal"
          required
          component={TextField}
          fullWidth
          onChange={handleChange}
          value={values.password}
          name="password"
          label="Password"
          type="password"
          id="password"
          disabled={loginReducer.isFetching}
        />
        {loginReducer.isError && (
          <Alert severity="error" style={{ marginBottom: 8 }}>
            username or password is not correct
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loginReducer.isFetching}
        >
          Sign In
        </Button>

        {loginReducer.isFetching && (
          <CircularProgress style={{ marginTop: 10 }} />
        )}
        <Grid container justify="flex-end">
          <Link component={RouterLink} to="/register" variant="body2">
            Don't have an account? Register
          </Link>
        </Grid>
      </Form>
      // <Form className={classes.form} noValidate onSubmit={handleSubmit}>
      //   <Field
      //     component={TextField}
      //     variant="outlined"
      //     margin="normal"
      //     required
      //     fullWidth
      //     label="Username"
      //     onChange={handleChange}
      //     value={values.username}
      //   />
      //   <Field
      //     component={TextField}
      //     variant="outlined"
      //     margin="normal"
      //     required
      //     fullWidth
      //     onChange={handleChange}
      //     value={values.password}
      //     name="password"
      //     label="Password"
      //     type="password"
      //   />

      //   {loginReducer.isError && (
      //     <Alert severity="error" style={{ marginBottom: 8 }}>
      //       Invalid account!
      //     </Alert>
      //   )}

      //   <Button
      //     type="submit"
      //     fullWidth
      //     variant="contained"
      //     color="primary"
      //     disabled={loginReducer.isFetching}
      //     className={classes.submit}
      //   >
      //     Sign In
      //   </Button>
      //   {loginReducer.isFetching && (
      //     <CircularProgress style={{ marginTop: 10 }} />
      //   )}
      //   <Grid container justify="flex-end">
      //     <Link component={RouterLink} to="/register" variant="body2">
      //       Don't have an account? Register
      //     </Link>
      //   </Grid>
      // </Form>
    );
  };

  return (
    <Container className={classes.root}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Login
          </Typography>
          <Formik
            validate={(values) => {
              let errors = {};
              if (!values.username) errors.username = "Enter username";
              if (!values.password) errors.password = "Enter password";
              return errors;
            }}
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(loginActions.login(values, props.history));
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};
