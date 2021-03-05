import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import * as galleryActions from "../../../actions/gallery.action";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function KeywordSearch() {
  const classes = useStyles();

  const [name, setName] = useState();
  const dispatch = useDispatch();

  const handleKeyword = (event) => {
    setName(event.target.value);
    dispatch(galleryActions.getGalleryByKeyword(event.target.value));
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by name"
        inputProps={{ "aria-label": "search by name" }}
        onChange={handleKeyword}
        value={name}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
