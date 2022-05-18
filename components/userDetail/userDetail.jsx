import React from "react";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
import Mention from "./Mention";
import axios from 'axios';

const DETAILS = "Info about ";

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    let newUser;
    this.state = {
      user: newUser
    };
    let newUserID = props.match.params.userId;
    axios
      .get(`/user/${newUserID}`)
      .then(response => {
        newUser = response.data;
        this.setState({ user: response.data });
        this.props.changeView(
          DETAILS,
          `${newUser.first_name} ${newUser.last_name}`
        );
      })
      .catch(err => console.log(err.response));
  }

  componentDidUpdate = () => {
    let newUserID = this.props.match.params.userId;
    if (this.state.user._id !== newUserID) {
      let self = this;
      axios
        .get(`/user/${newUserID}`)
        .then(response => {
          let newUser = response.data;
          self.setState({ user: newUser });
          self.props.changeView(
            DETAILS,
            `${newUser.first_name} ${newUser.last_name}`
          );
        })
        .catch(err => console.log(err.response));
    }
  };

  render() {
    return this.state.user ? (
      <Grid container justify="space-evenly" alignItems="center">
        <Grid xs={8} item>
          <Typography variant="h4">
            {`${this.state.user.first_name} ${this.state.user.last_name}`}
          </Typography>
          <Typography variant="h6">
            {`"${this.state.user.description}"`} <br />
            Location: {this.state.user.location} <br />
            Occupation: {this.state.user.occupation}
          </Typography>

          <Button variant="contained" size="large">
            <Link to={`/photos/${this.state.user._id}`}>See photos</Link>
          </Button>

          <br />
          <Divider />
          <br />
          <Typography variant="h4">Mentioned in:</Typography>
          <br />

          {this.state.user.mentioned.length > 0 ? (
            this.state.user.mentioned.map((photo_id, i) => {
              return <Mention key={photo_id + i} photo_id={photo_id} />;
            })
          ) : (
            <Typography variant="h6">None</Typography>
          )}
          
        </Grid>

        <Grid xs={2} item />

      </Grid>
    ) : (
      <Typography>Welcome to Zherui Lin&apos;s Photo Sharing App!</Typography>
    );
  }
}

export default UserDetail;
