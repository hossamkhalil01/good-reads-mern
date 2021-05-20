import {
  Button,
  FormControl,
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
import { useHistory } from "react-router-dom";
import { AuthURL } from "../api/urls";
import setLocalStorage from "../services/authService";

const Register = () => {
  let history = useHistory();

  const [formValues, setFormValues] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    avatarFile: "",
    avatarFileName: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
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
      avatarFile: e.target.files[0],
      avatarFileName: e.target.files[0].name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    const data = {
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      password: formValues.password,
    };
    axios.post(`${AuthURL}register`, data).then((res) => {
      setLocalStorage(res.data.data);
      history.push("/landing");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      encType="multipart/form-data"
      className="mt-5"
    >
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
                onChange={handleChange("firstName")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="lastName" required>
                Last Name
              </InputLabel>
              <Input
                id="lastName"
                value={formValues.lastName}
                onChange={handleChange("lastName")}
              />
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
                onChange={handleChange("email")}
              />
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
                onChange={handleChange("password")}
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
                onChange={handleChange("confirmPassword")}
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

export default Register;
