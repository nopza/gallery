import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import * as galleryActions from "../../../actions/gallery.action";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const [type, setType] = useState();
  const dispatch = useDispatch();

  const handleType = (event) => {
    setType(event.target.value);
    dispatch(galleryActions.getGalleryByType(event.target.value));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Type</InputLabel>
      <Select value={type} onChange={handleType} defaultValue="all">
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="animal">Animal</MenuItem>
        <MenuItem value="view">View</MenuItem>
        <MenuItem value="people">People</MenuItem>
        <MenuItem value="meme">Meme</MenuItem>
      </Select>
    </FormControl>
  );
};
