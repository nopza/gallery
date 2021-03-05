import React from "react";

import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import * as registerActions from "../../../actions/register.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "144px",
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    justifyContent: "center",
  },
}));

function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const registerReducer = useSelector(({ registerReducer }) => registerReducer);

  const handleCancel = () => {
    window.location.assign("/");
  };

  return (
    <Container className={classes.root}>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) errors.username = "Required";
          if (!values.password) errors.password = "Required";
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let data = {
              username: values.username,
              password: values.password,
            };
            dispatch(registerActions.register(data, props.history));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values }) => (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Reigister
              </Typography>
              <Form noValidate>
                <Field
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  component={TextField}
                  type="username"
                  name="username"
                  label="Username"
                  id="username"
                  value={values.username}
                />
                <br />
                <Field
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  component={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  value={values.password}
                />
                <br />

                <CardActions className={classes.button}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={registerReducer.isFetching}
                  >
                    Submit
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    type="submit"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Form>
              {registerReducer.isError && (
                <Alert severity="error" style={{ marginTop: 10 }}>
                  {registerReducer.result && registerReducer.result.result}
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </Formik>
    </Container>
  );
}

export default RegisterPage;
