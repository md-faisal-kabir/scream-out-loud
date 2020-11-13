import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import monkey from "../images/monkey.png";
import EditDetails from "./EditDetails";
import MyButton from "../util/MyButton";

//redux
import { connect } from "react-redux";
import { uploadImage, logoutUser } from "../redux/actions/userAction";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

//icons
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  appIcon: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

class Profile extends Component {
  handleUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditIcon = () => {
    let element = document.getElementById("imageUploader");
    element.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, imageUrl, bio, website, location, createdAt },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkUp = !loading ? (
      //if loading authenticate
      authenticated ? (
        //if authenticated show profile
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img className="profile-image" src={imageUrl} alt="profile" />
              <input
                type="file"
                id="imageUploader"
                hidden
                onChange={(e) => this.handleUpload(e)}
              />
              <MyButton
                tip="change profile picture"
                onClick={this.handleEditIcon}
              >
                <EditIcon />
              </MyButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink component={Link} to={`/user/${handle}`} variant="h5">
                <AlternateEmailIcon color="primary" />
                {handle}
              </MuiLink>
              <hr />

              {bio && (
                <Fragment>
                  <Typography variant="body2">{bio}</Typography>
                  <hr />
                </Fragment>
              )}

              {location && (
                <Fragment>
                  <PersonPinIcon color="primary" />
                  <span> {location}</span>
                  <hr />
                </Fragment>
              )}

              {website && (
                <Fragment>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank">
                    {" "}
                    {website}
                  </a>
                  <hr />
                </Fragment>
              )}
              <CalendarTodayIcon color="primary" />
              <Typography variant=" body2">
                {" "}
                Member from: {dayjs(createdAt).format("MMM YYYY")}
              </Typography>
            </div>
          </div>
          {/* <Tooltip title="Logout" placement="top">
            <IconButton color="primary">
              <KeyBoardReturn onClick={this.handleLogout} />
            </IconButton>
          </Tooltip> */}
          <MyButton tip="Logout" onClick={this.handleLogout}>
            <PowerSettingsNewIcon />
          </MyButton>
          <EditDetails />
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <img src={monkey} alt="profile" className={classes.appIcon} />

          <Typography variant="body2" color="primary" align="center">
            {" "}
            You are not logged in
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>..Loading</p>
    );
    return profileMarkUp;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImage,
  logoutUser,
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
