import * as galleryActions from "./../../../actions/gallery.action";

import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  field: {
    marginTop: 16,
  },
  card: {
    padding: 20,
  },
  button: {
    justifyContent: "flex-end",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [type, setType] = useState();
  // const [imgError, setImgError] = useState();

  // const testSchema = Yup.object().shape({
  //   type: Yup.string().required("Please Pick type"),
  //   name: Yup.string().required("Please Enter Name"),
  //   detail: Yup.string().required("Please Enter Detail"),
  //   image: Yup.mixed().required("Please Upload Image"),
  // });

  const typeOptions = [
    { value: "animal", label: "animal" },
    { value: "view", label: "view" },
    { value: "people", label: "people" },
    { value: "meme", label: "meme" },
  ];

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const showForm = ({
    values,
    setFieldValue,
    errors,
    handleChange,
    handleSubmit,
  }) => {
    return (
      <Form>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h3">
              Create New Post
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />

            <br />
            <Field
              className={classes.field}
              fullWidth
              component={TextField}
              name="detail"
              type="text"
              label="Detail"
            />

            {/* <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={values.type}
                onChange={handleTypeChange}
                className={classes.formControl}
              >
                <MenuItem value="animal">Animal</MenuItem>
                <MenuItem value="view">View</MenuItem>
                <MenuItem value="people">People</MenuItem>
              </Select>
            </FormControl> */}
            <br />
            <br />
            <Grid item md={6} xs={12}>
              <Select
                placeholder="Type"
                onChange={(selectedOption) => {
                  // This inline function can now completely be reaplce by handleChange("type")
                  handleChange("type")(selectedOption.value);
                  console.log(selectedOption.value);
                }}
                isSearchable={true}
                options={typeOptions}
                name="type"
                isLoading={false}
                loadingMessage={() => "Fetching type"}
                noOptionsMessage={() => "Type appears here"}
              />
              {/* <p className="MuiFormHelperText-root Mui-error">
                {errors.type ? errors.type : undefined}
              </p> */}
              <ErrorMessage name="type">
                {(msg) => (
                  <div className="MuiFormHelperText-root Mui-error">{msg}</div>
                )}
              </ErrorMessage>
            </Grid>
            <br />

            <div>{showPreviewImage(values)}</div>

            <div className={classes.field}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload image
                <input
                  type="file"
                  // Multiple images
                  // onChange={(e) => {
                  //   e.preventDefault();
                  //   if (e.target.files) {
                  //     setFieldValue("file", e.target.files); // for upload
                  //     const file_img = [];
                  //     for (let i = 0; i < e.target.files.length; i++) {
                  //       file_img.push(URL.createObjectURL(e.target.files[i]));
                  //     }
                  //     setFieldValue("file_obj", file_img); // for preview image
                  //   } else {
                  //     setFieldValue("file", null); //for upload
                  //     setFieldValue("file_obj", []); //for preview image
                  //   }
                  // }}
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.files[0]) {
                      // setImgError(false);
                      setFieldValue("file", e.target.files[0]); // for upload
                      setFieldValue(
                        "file_obj",
                        URL.createObjectURL(e.target.files[0])
                      ); // for preview image
                    } else {
                      // setImgError(true);
                      setFieldValue("file", null); //for upload
                      setFieldValue("file_obj", null); //for preview image
                    }
                  }}
                  name="image"
                  click-type="type1"
                  className="picupload"
                  multiple
                  accept="image/*"
                  id="files"
                  style={{ padding: "20px 0" }}
                  hidden
                />
              </Button>
              <ErrorMessage name="image">
                {(msg) => (
                  <div className="MuiFormHelperText-root Mui-error">{msg}</div>
                )}
              </ErrorMessage>

              {/* <p className="MuiFormHelperText-root Mui-error">{errors.image}</p> */}
            </div>
          </CardContent>
          <CardActions className={classes.button}>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/mygallery"
              color="default"
              raised
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values) => {
    // if (values.file_obj) {
    //   // const file_img = <></>;
    //   // for (let i = 0; i < values.file_obj.length; i++) {
    //   //   file_img += <img src={values.file_obj[i]} style={{ height: 350 }} />;
    //   // }
    //   console.log(values.file_obj);
    //   return (
    //     <>
    //       {values.file_obj.map((item, i) => (
    //         <img src={item} style={{ height: 50 }} />
    //       ))}
    //     </>
    //   );
    // }

    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 200 }} />;
    }
  };

  return (
    <Container className={classes.root}>
      {/* Main content */}

      <div className="box-body" style={{ marginTop: 30 }}>
        <Formik
          // validationSchema={testSchema}
          validate={(values) => {
            let errors = {};
            // if (imgError == true) errors.image = "Please Upload Image";
            if (!values.name) errors.name = "Enter name";
            if (!values.detail) errors.detail = "Enter detail";
            if (!values.type) errors.type = "Please pick type";
            const validImageTypes = [
              "image/gif",
              "image/jpeg",
              "image/png",
              "image/jpg",
            ];
            if (!values.file) {
              errors.image = "Invalid Image";
            }
            if (values.file && !validImageTypes.includes(values.file.type)) {
              errors.image = "File type not correct";
            }
            return errors;
          }}
          initialValues={{ name: "", detail: "", type: "", image: "" }}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("detail", values.detail);
            formData.append("image", values.file);
            formData.append("type", values.type);
            // console.log({
            //   fileName: values.file.name,
            //   type: values.file.type,
            //   size: `${values.file.size} bytes`,
            // });
            dispatch(galleryActions.addGallery(formData, props.history));
            setSubmitting(false);
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>
      {/* /.content */}
    </Container>
  );
};
