import React, { Component } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: 20,
    textAlign: "center",
    background: "#26241a",
    marginTop: 20,
    color: "#f1f1f1",
  },
}));

function Footer() {
  const classes = useStyles();

  return <div className={classes.footer}>© 2020 Copyright:Nopza</div>;
}

export default Footer;
