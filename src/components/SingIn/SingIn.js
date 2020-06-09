import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../Copyright/Copyright";
import {connect} from "react-redux";
import {login} from "../../actions";
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


const userRoles = {
  'client': true,
  'friend': true
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false
    };
  }

  updateEmail(email) {
    this.setState({
      ...this.state,
      email
    });
  }

  updatePassword(password) {
    this.setState({
      ...this.state,
      password
    });
  }

  singIn() {
    const data = {
      role: 'friend',
      id: 0
    };

    // fetch(`/login?email=${this.state.email}&password=${this.state.password}`)
    //   .then(response => response.json())
    //   .then(data => {
        if (!data.role) {
          this.setState({
            ...this.state,
            error: true
          });
        } else if (data.role in userRoles) {
          this.props.login(data);
          const { history } = this.props;
          if (history) history.push(`${data.role}/dashboard`);
        }
      // })
      // .catch(console.error);
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={event => this.updateEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={event => this.updatePassword(event.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                this.singIn()
              }}
            >
              Sign In
            </Button>
          </form>
        </div>

        <Copyright/>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  login: item => dispatch(login(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SignIn)));