import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { imageUrl } from "./../../../constants";
import * as galleryActions from "../../../actions/gallery.action";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//////////////////////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
  showcard: {
    background: "#f1f1f1",
    "&:hover": {
      background: "#93a1ae",
    },
  },
  card: {
    display: "block",
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
}));

export default (props) => {
  const galleryReducer = useSelector(({ galleryReducer }) => galleryReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { resultlist } = galleryReducer;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    dispatch(galleryActions.getGallerys());
  }, []); // get data when refresh

  const handleDelete = () => {
    dispatch(galleryActions.deleteGalleryAll(selectedGallery.gallery_id));
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedGallery === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <img
            src={`${imageUrl}/images/${selectedGallery.image}?${Date.now()}`}
            style={{ width: 300, borderRadius: "5%" }}
          />
          <br />
          Confirm to delete the gallery? : {" " + selectedGallery.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted gallery.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleDelete}
            color="secondary"
            style={{ outlineStyle: "none" }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            color="default"
            style={{ outlineStyle: "none" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container className={classes.root}>
      <Card style={{ background: "#edc218" }}>
        <div style={{ background: "#EFF1F4" }}>
          <Typography
            variant="h3"
            style={{
              padding: "20px 10px",
              background: "#26241a",
              color: "#ffffff",
              fontWeight: 100,
              fontSize: "35px",
            }}
          >
            YOUR GALLERY
          </Typography>
        </div>
        <div style={{ padding: "20px 10px" }}>
          <Button
            variant="contained"
            component={Link}
            to="/gallery/create"
            style={{ background: "#26241a", color: "#ffffff" }}
          >
            Create Gallery
          </Button>
        </div>
        <Container>
          <Grid container spacing={1} className={classes.productContainer}>
            {console.log(resultlist)}
            {resultlist !== null &&
              resultlist.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <Card className={(classes.showcard, classes.card)}>
                    <div style={{ background: "#EFF1F4" }}>
                      <Tooltip title="Delete">
                        <IconButton
                          style={{ outlineStyle: "none" }}
                          aria-label="delete"
                          onClick={() => {
                            setSelectedGallery(item);
                            setOpenDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          component={Link}
                          to={`/gallery/edit/${item.gallery_id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </div>

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
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Card>
      {showDialog()}
    </Container>
  );
};
