import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link, Redirect } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [signin, setSignin] = React.useState(false);

  const classes = useStyles();

  const submitHandler = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", { email: email, pass: pass })
      .then(res => {
        if (res.data === "invalid") {
          window.alert(`user ${email} doesn't exost \nPlease sign up first`);
        } else {
          console.log(res.data)
          reactLocalStorage.set('token',res.data)
          window.alert(`signin in successfull :)`);
          setSignin(true);
        }
      })
      .catch(err => console.error(err));
  };
  if (signin || reactLocalStorage.get('token')) {
    return <Redirect to="/" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <ValidatorForm
          className={classes.form}
          noValidate
          onSubmit={submitHandler}
        >
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            validators={["required", "isEmail"]}
            errorMessages={["email required", "email is not valid"]}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextValidator
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            validators={["required"]}
            errorMessages={["password required"]}
            value={pass}
            onChange={e => {
              setPass(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    </Container>
  );
}
