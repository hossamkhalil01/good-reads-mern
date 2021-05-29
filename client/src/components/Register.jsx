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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { authUrl } from "../api/urls";
import { setLocalStorage } from "../services/authService";

const Register = (props) => {
  let history = useHistory();

  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    avatar: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const [formValidations, setFormValidations] = React.useState({
    email: { err: false, msg: "" },
    password: { err: false, msg: "" },
    firstName: { err: false, msg: "" },
    lastName: { err: false, msg: "" },
    confirmPassword: { err: false, msg: "" },
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
    } else if (prop === "confirmPassword" || prop === "password") {
      if (formValues.password !== event.target.value) {
        setFormValidations({
          ...formValidations,
          password: { err: true, msg: "Passwords don't match." },
          confirmPassword: { err: true, msg: "" },
        });
        setErrorsExist(true);
      } else {
        setFormValidations({
          ...formValidations,
          password: { err: false, msg: "" },
          confirmPassword: { err: false, msg: "" },
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

  const handleClickShowConfirmPassword = () => {
    setFormValues({
      ...formValues,
      showConfirmPassword: !formValues.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = (e) => {
    setFormValues({
      ...formValues,
      avatar: e.target.files[0],
    });
  };

  const checkServerValidation = (msg) => {
    const errors = msg.split("User validation failed: ");
    let emailErr = false;
    let emailMsg = "";
    let passErr = false;
    let passMsg = "";
    let firstNameErr = false;
    let firstNameMsg = "";
    let lastNameErr = false;
    let lastNameMsg = "";

    let errsArray = ["email: Email already exists"];

    if (errors[1]) errsArray = errors[1].split(", ");

    for (const e of errsArray) {
      if (e.includes("email")) {
        emailErr = true;
        emailMsg = e.split("email: ");
      }
      if (e.includes("password")) {
        passErr = true;
        passMsg = e.split("password: ");
      }
      if (e.includes("firstName")) {
        firstNameErr = true;
        firstNameMsg = e.split("firstName: ");
      }
      if (e.includes("lastName")) {
        lastNameErr = true;
        lastNameMsg = e.split("lastName: ");
      }
    }
    setFormValidations({
      ...formValidations,
      firstName: { err: firstNameErr, msg: firstNameMsg },
      lastName: { err: lastNameErr, msg: lastNameMsg },
      email: { err: emailErr, msg: emailMsg },
      password: { err: passErr, msg: passMsg },
    });
    setErrorsExist(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errorsExist) {
      const data = {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.password,
      };

      const myImage = formValues.avatar;

      const formData = new FormData();
      formData.append("body", JSON.stringify(data));
      formData.append("myImage", myImage);

      axios
        .post(`${authUrl}register`, formData)
        .then((res) => {
          setLocalStorage(res.data.data);
          if (props.location.state) {
            history.push(props.location.state.referer);
          } else {
            history.push("/home");
          }
        })
        .catch((err) => {
          const msg = err.response.data.message;
          checkServerValidation(msg);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <Paper style={{ padding: 16, maxWidth: 600 }} elevation={3}>
        <Grid container alignItems="flex-start" justify="center" spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="firstName" required>
                First Name
              </InputLabel>
              <Input
                id="firstName"
                value={formValues.firstName}
                onBlur={handleChange("firstName")}
                onChange={handleChange("firstName")}
                error={formValidations.firstName.err}
                required
              />
            </FormControl>
            <FormHelperText error={formValidations.firstName.err}>
              {formValidations.firstName.msg}
            </FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="lastName" required>
                Last Name
              </InputLabel>
              <Input
                id="lastName"
                type="text"
                value={formValues.lastName}
                onChange={handleChange("lastName")}
                onBlur={handleChange("lastName")}
                error={formValidations.lastName.err}
                required
              />
              <FormHelperText error={formValidations.lastName.err}>
                {formValidations.lastName.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="confirm-password" required>
                Confirm Password
              </InputLabel>
              <Input
                id="confirm-password"
                type={formValues.showConfirmPassword ? "text" : "password"}
                value={formValues.confirmPassword}
                onBlur={handleChange("confirmPassword")}
                onChange={handleChange("confirmPassword")}
                error={formValidations.confirmPassword.err}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {formValues.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formValidations.confirmPassword.err}>
                {formValidations.confirmPassword.msg}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                startIcon={<CloudUploadIcon />}
              >
                Profile Picture
                <input
                  accept="image/*"
                  id="avatar"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                  hidden
                />
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default withRouter(Register);
