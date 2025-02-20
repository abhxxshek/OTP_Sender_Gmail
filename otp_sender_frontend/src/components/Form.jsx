import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurText from "../effects/BlurText";

const Form = () => {
  const [email, setEmail] = useState("");
  const [otpsend, setOtpsend] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function sendOtp() {
    axios
      .post("https://otp-sender-backend-snm3.onrender.com/otp/send-otp", { email })
      .then((res) => {
        setOtpsend(true);
        setMessage(res.data.message);
      })
      .catch((error) => {
        alert("Invalid otp");
        console.log("error !", error);
      });
  }

  function verifyOtp() {
    axios
      .post("https://otp-sender-backend-snm3.onrender.com/otp/verify-otp", { email, otp })
      .then((res) => {
        navigate("/success-page");
      })
      .catch((error) => {
        if (error.res) {
          alert(error.res.data.message || "otp verification failed !");
        } else {
          alert("Server error. Please try again.");
        }

        console.log("error verification!", error);
      });
  }
  return (
    <>
      <Box
        sx={{
          width: "60%",
          margin: "10% auto",
          backgroundColor: "rgba(238, 255, 4, 0.83)",
          textAlign: "center",
          padding: "5%",
          borderRadius: "20px",
        }}
        className="box"
      >
        <Typography
          variant="h2"
          sx={{ paddingBottom: "20px", fontWeight: "550" }}
        >
          <BlurText
            text="Verify your email"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </Typography>
        <Grid container spacing={1}>
          {!otpsend ? (
            <>
              <Grid size={{ sx: 12, md: 9 }}>
                <TextField
                  variant="outlined"
                  name="email"
                  value={email}
                  placeholder="Enter your email..."
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid size={{ sx: 12, md: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(0,0,0)",
                    height: "100%",
                    transition: "0.3s", // Smooth transition
                    "&:hover": {
                      backgroundColor: "rgb(0,0,0)", // Change color on hover
                      color: "yellow", // Change text color on hover
                      boxShadow: "0 0 25px rgb(0,0,0)", // Add glow effect
                    },
                  }}
                  onClick={() => {
                    sendOtp();
                  }}
                >
                  Send OTP
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{ sx: 12, md: 9 }}>
                <TextField
                  variant="outlined"
                  name="otp"
                  value={otp}
                  placeholder="Enter the OTP..."
                  type="text"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid size={{ sx: 12, md: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(0,0,0)",
                    height: "100%",
                    transition: "0.3s", // Smooth transition
                    "&:hover": {
                      backgroundColor: "rgb(0,0,0)", // Change color on hover
                      color: "yellow", // Change text color on hover
                      boxShadow: "0 0 25px rgb(0,0,0)", // Add glow effect
                    },
                  }}
                  onClick={() => {
                    verifyOtp();
                  }}
                >
                  Verify OTP
                </Button>
              </Grid>
            </>
          )}
          {message && (
            <Box
              sx={{ textAlign: "center", color: "black", marginTop: "30px" }}
            >
              <Typography variant="h5">{message}...</Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Form;
