import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/monkey.png";
import { Link } from "react-router-dom";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userAction";

const styles = (theme) => ({
  ...theme.formContent,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.UI.errors !== this.props.UI.errors) {
      this.setState({ errors: this.props.UI.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="email"
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
            />

            {errors.general && (
              <Typography variant="body2" className={classes.errors}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={loading}
            >
              login
              {loading && (
                <CircularProgress
                  color="primary"
                  size={20}
                  className={classes.progress}
                ></CircularProgress>
              )}
            </Button>
            <br />
            <small>
              don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
