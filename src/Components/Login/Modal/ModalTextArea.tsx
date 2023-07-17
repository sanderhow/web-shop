import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, useMediaQuery } from "@mui/material";
import { IUserData } from "../../SmallProductCard/SmallProductCard";
import axios from "axios";
import { useUser } from "../../../Contexts/Auth/UserData";
import React from "react";

interface IModalTextAreaProps {
  handleClose: () => void;
}

const ModalTextArea: React.FC<IModalTextAreaProps> = ({ handleClose }) => {
  const { setUserItems, setIsAuth } = useUser();
  const isMobileScreen = useMediaQuery("(max-width:600px)");
  const isTabletOrMobileScreen = useMediaQuery("(max-width:1000px)");

  const getUser = async () => {
    const { data } = await axios.get<IUserData>(
      `https://fakestoreapi.com/users/1`
    );
    setUserItems(data);
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (username === "mor_2314" && password === "a") {
      // 83r5^_
      getUser();
      setIsAuth(true);
      handleClose();
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Grid 
          sx={{
            minWidth: isMobileScreen ? '250px' : '400px'
          }}
          container>
          <CssBaseline />
          {isTabletOrMobileScreen ? undefined : (
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://nordvpn.com/wp-content/uploads/blog-featured-nordvpn-login-and-sign-up-process-explained-1.svg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[700],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#b8b5b5" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ModalTextArea;
