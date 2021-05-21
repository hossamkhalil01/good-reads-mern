import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { AuthURL } from "../api/urls";
import setLocalStorage from "../services/authService";

const Login = (props) => {
  let history = useHistory();

  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [formValidations, setFormValidations] = React.useState({
    email: { err: false, msg: "" },
    password: { err: false, msg: "" },
  });
  const [errorsExist, setErrorsExist] = React.useState(false);

  const handleChange = (prop) => (event) => {
    if (!event.target.value) {
      setFormValidations({
        ...formValidations,
        [prop]: { err: true, msg: "This field is required" },
      });
      setErrorsExist(true);
    } else if (prop === "email") {
      if (
        !event.target.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setFormValidations({
          ...formValidations,
          email: { err: true, msg: "Please enter a valid email." },
        });
        setErrorsExist(true);
      } else {
        setFormValidations({
          ...formValidations,
          email: { err: false, msg: "" },
        });
        setErrorsExist(false);
      }
    } else {
      setFormValidations({
        ...formValidations,
        [prop]: { err: false, msg: "" },
      });
      setErrorsExist(false);
    }

    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormValues({ ...formValues, showPassword: !formValues.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkServerValidation = (msg) => {
    setFormValidations({
      ...formValidations,

      email: { err: true, msg: "Email or password is invalid." },
      password: { err: true, msg: "" },
    });
    setErrorsExist(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errorsExist) {
      const data = {
        email: formValues.email,
        password: formValues.password,
      };
      axios
        .post(`${AuthURL}login`, data)
        .then((res) => {
          setLocalStorage(res.data.data);
          if (props.location.state) {
            history.push(props.location.state.referer);
          } else {
            history.push("/landing");
          }
        })
        .catch((err) => {
          console.log(err);
          const msg = err.response.data.message;
          checkServerValidation(msg);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-5"
    >
      <Paper style={{ padding: 16, maxWidth: 600 }} elevation={3}>
        <Grid
          container
          alignItems="baseline"
          alignContent="space-around"
          justify="space-around"
        >
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email" required>
                Email address
              </InputLabel>
              <Input
                id="email"
                type="email"
                value={formValues.email}
                onBlur={handleChange("email")}
                onChange={handleChange("email")}
                error={formValidations.email.err}
                required
              />
              <FormHelperText error={formValidations.email.err}>
                {formValidations.email.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                id="password"
                type={formValues.showPassword ? "text" : "password"}
                value={formValues.password}
                onBlur={handleChange("password")}
                onChange={handleChange("password")}
                error={formValidations.password.err}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formValues.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formValidations.password.err}>
                {formValidations.password.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth className="mt-2">
              <Button variant="contained" color="primary" type="submit">
                Sign In
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default withRouter(Login);
