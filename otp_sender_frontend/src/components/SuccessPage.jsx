import { Box, Typography } from "@mui/material";
import React from "react";
import BlurText from "../effects/BlurText";
import SplitText from "../effects/SplitText";
import SplashCursor from "../effects/SplashCursor";




const SuccessPage = () => {
  return (
    
    <div>
        <SplashCursor />
      <Box
        sx={{
          margin: "10% auto",
        //   backgroundColor: "rgb(251, 255, 0)",
          borderRadius: "20px",
          width: "70%",
          textAlign: "center",
          padding: "5%",
          color:"rgb(73, 72, 72)"
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "600" }}>
          <SplitText
            text={`Edaa moneeeee....
              
              Gmail Verified Successfully!`}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </Typography>
      </Box>
    </div>
  );
};

export default SuccessPage;
