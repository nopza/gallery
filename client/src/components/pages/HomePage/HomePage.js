import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { imageUrl } from "./../../../constants";
import * as galleryActions from "../../../actions/gallery.action";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import SelectSearch from "../../fragments/SelectSearch/SelectSearch";
import KeywordSearch from "../../fragments/KeywordSearch/KeywordSearch";

import {
  Grid,
  Container,
  Card,
  Typography,
  CardContent,
  CardActionArea,
  CardMedia,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Divider,
} from "@material-ui/core";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";

//////////////////////////////////////////////////////

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  star: {
    color: "red",
  },
  orderList: {
    overflowX: "hidden",
    height: 490,
    flex: 1,
    width: "100%",
    maxHeight: 490,
  },
  orderListItem: {
    height: 100,
    maxHeight: 100,
  },
  productContainer: {
    height: "100%",
    marginBottom: 20,
  },
  leftLabel: {
    marginLeft: 20,
  },
  rightLabel: {
    marginRight: 20,
  },

  card: {
    display: "flex",
    width: "100%",
    background: "#f1f1f1",
    "&:hover": {
      background: "#93a1ae",
    },
  },
  underimg: {
    "&:hover": {
      whiteSpace: "normal",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: "20px 0px 0px 0px",
    outline: "none !important",
    display: "flex",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
}));

export default (props) => {
  const galleryReducer = useSelector(({ galleryReducer }) => galleryReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { resultlist } = galleryReducer;
  const [type, setType] = useState("all");
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(galleryActions.getAllGallerys());
  }, []); // get data when refresh

  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleKeyword = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(galleryActions.searchGallery(name, type));
  };

  return (
    <Container className={classes.root}>
      <Card style={{ background: "#edc218" }}>
        <div style={{ background: "#26241a", padding: "20px 10px" }}>
          <Typography
            variant="h3"
            style={{ color: "#ffffff", fontWeight: 100, fontSize: "35px" }}
          >
            GALLERY PAGE
          </Typography>
        </div>
        <div style={{ padding: "20px 10px" }}>
          <Card>
            <Grid
              container
              item
              xs={12}
              spacing={3}
              style={{ padding: "20px 40px" }}
            >
              <FormControl className={classes.formControl}>
                <InputLabel>Select type</InputLabel>
                <Select
                  value={resultlist.type}
                  onChange={handleType}
                  defaultValue="all"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="animal">Animal</MenuItem>
                  <MenuItem value="view">View</MenuItem>
                  <MenuItem value="people">People</MenuItem>
                  <MenuItem value="meme">Meme</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.input}
                  placeholder="Search by name"
                  inputProps={{ "aria-label": "search by name" }}
                  onChange={handleKeyword}
                  value={resultlist.name}
                  label="Name"
                />
              </FormControl>

              <IconButton
                className={classes.iconButton}
                type="submit"
                aria-label="search"
                onClick={handleSubmit}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Card>
        </div>
        {/* <SelectSearch values={resultlist.type} />
        <KeywordSearch values={resultlist.name} /> */}
        <Container>
          <Grid container spacing={1} className={classes.productContainer}>
            {/* {console.log(resultlist)} */}
            {resultlist !== null &&
              resultlist.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={`${imageUrl}/images/${item.image}?${Date.now()}`} //render new image from Date.now
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography
                          noWrap
                          gutterBottom
                          className={classes.underimg}
                        >
                          Name: {item.name}
                          <br />
                          Description: {item.detail}
                          <br />
                          post by {item.username}
                        </Typography>

                        {/* //send Props */}
                        {/* <Button type="button" component={Link} to={`/gallery/edit/${item.gallery_id}`} >
                            Edit
                          </Button> */}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Card>
    </Container>
  );
};
