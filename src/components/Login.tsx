import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField
} from "@mui/material";
import { useFormik } from "formik";

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
};

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length <= 2) {
        errors.password = "Password length must be more than 2 characters";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Grid style={{ width: "100%", maxWidth: "300px" }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}> here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label={"Email"}
                {...formik.getFieldProps("email")}
                margin={"normal"}
              />
              {
                formik.touched.email && formik.errors.email &&
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              }
              <TextField
                type={"password"}
                label={"Password"}
                {...formik.getFieldProps("password")}
                margin={"normal"}
              />
              {
                formik.touched.password && formik.errors.password &&
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              }
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
