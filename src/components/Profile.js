import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import monkey from "../images/monkey.png";

//redux
import { connect } from "react-redux";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";

//icons
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

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
            </div>
            <hr />
            <div className="profile-details">
              <AlternateEmailIcon color="primary"></AlternateEmailIcon>
              <MuiLink component={Link} to={`/user/${handle}`} variant="h5">
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

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
