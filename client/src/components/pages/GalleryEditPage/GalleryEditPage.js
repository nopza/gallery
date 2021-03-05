import * as galleryActions from "./../../../actions/gallery.action";

import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrl } from "./../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Select from "react-select";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { TextField } from "formik-material-ui";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";

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
  const galleryReducer = useSelector(({ galleryReducer }) => galleryReducer);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [type, setType] = useState();

  const testSchema = Yup.object().shape({
    type: Yup.string().required("Please Pick type"),
    name: Yup.string().required("Please Enter Name"),
    detail: Yup.string().required("Please Enter Detail"),
  });

  const typeOptions = [
    { value: "animal", label: "animal" },
    { value: "view", label: "view" },
    { value: "people", label: "people" },
  ];

  useEffect(() => {
    let id = props.match.params.id; //id from gallerypage
    dispatch(galleryActions.getGalleryById(id));
  }, []);

  const handleDeleteConfirm = () => {
    console.log(selectedGallery);
    dispatch(galleryActions.deleteGallery(selectedGallery, props.history));
  };

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
              Edit Post
            </Typography>

            <Field
              className={classes.field}
              fullWidth
              component={() => <h3>Gallery ID# {values.gallery_id}</h3>}
              name="gallery_id"
              type="text"
              label="Id"
            />
            <br />

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
            <br />
            <br />
            {/* <Grid item md={6} xs={12}>
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
              <p className="MuiFormHelperText-root Mui-error">{errors.type}</p>
            </Grid> */}

            <Grid item md={6} xs={12}>
              <Field
                name="type"
                as="select"
                className="selectpicker form-control"
              >
                <option value="animal">Animal</option>
                <option value="view">View</option>
                <option value="people">People</option>
                <option value="meme">Meme</option>
              </Field>
              <ErrorMessage name="type">
                {(msg) => (
                  <div className="MuiFormHelperText-root Mui-error">{msg}</div>
                )}
              </ErrorMessage>
            </Grid>
            <div className={classes.field}>{showPreviewImage(values)}</div>

            <div className={classes.field}>
              <Button
                variant="contained"
                component="label"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Upload image
                <input
                  type="file"
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.files[0]) {
                      setFieldValue("file", e.target.files[0]); // for upload
                      setFieldValue(
                        "file_obj",
                        URL.createObjectURL(e.target.files[0])
                      ); // for preview image
                    } else {
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
            </div>
          </CardContent>
          <CardActions className={classes.button}>
            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
            <Button
              onClick={
                (setSelectedGallery(values.gallery_id), handleDeleteConfirm) //send gallery id and do handleDeleteConfirm
              }
              variant="contained"
              color="secondary"
              type="submit"
            >
              Delete
            </Button>
            {console.log(values)}
            <Button
              variant="contained"
              component={Link}
              to="/mygallery"
              color="default"
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 200 }} />;
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 200 }}
        />
      );
    }
  };

  return (
    <Container className={classes.root}>
      {/* Main content */}
      <div className="box-body" style={{ marginTop: 30 }}>
        <Formik
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
            if (!galleryReducer.result.image) {
              if (!values.file) {
                errors.image = "Invalid Image";
              }
            }
            if (values.file && !validImageTypes.includes(values.file.type)) {
              errors.image = "File type not correct";
            }

            return errors;
          }}
          validationSchema={testSchema}
          enableReinitialize
          initialValues={
            galleryReducer.result
              ? galleryReducer.result
              : {
                  name: "loading",
                  detail: "loading",
                  type: "loading",
                }
          }
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("gallery_id", values.gallery_id);
            formData.append("name", values.name);
            formData.append("detail", values.detail);
            if (values.file) {
              formData.append("image", values.file);
            }
            formData.append("type", values.type);

            dispatch(galleryActions.updateGallery(formData, props.history));
          }}
        >
          {(props) => showForm(props)}
        </Formik>
      </div>
      {/* /.content */}
    </Container>
  );
};
