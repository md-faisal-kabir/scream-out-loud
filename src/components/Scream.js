import React, { Component } from "react";
import { Link } from "react-router-dom";

//MUI
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        userHandle,
        userImage,
        createdAt,
        likeCount,
        CommentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="profile"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h6"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
