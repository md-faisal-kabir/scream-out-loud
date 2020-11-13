import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

//icons
import ContactsIcon from "@material-ui/icons/Contacts";

//redux
import { connect } from "react-redux";
import { editDetails } from "../redux/actions/userAction";
import { IconButton } from "@material-ui/core";

const styles = (theme) => ({
  button: {
    float: "right",
  },
});
class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      bio: "",
      location: "",
      website: "",
      open: false,
    };
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount = () => {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      website: credentials.website ? credentials.website : "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetail = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    };
    this.props.editDetails(userDetail);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit profile">
          <IconButton color="primary" className={classes.button}>
            <ContactsIcon onClick={this.handleClickOpen} />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Your Details</DialogTitle>
          <DialogContent>
            <TextField
              name="bio"
              multiline
              label="Bio"
              type="text"
              value={this.state.bio}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              name="location"
              label="Location"
              type="text"
              fullWidth
              value={this.state.location}
              onChange={this.handleChange}
            />
            <TextField
              name="website"
              label="Website"
              type="text"
              fullWidth
              value={this.state.website}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  editDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editDetails })(
  withStyles(styles)(EditDetails)
);
