import React, { useEffect, useState } from "react";

// MUI
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";

const SkeletonLoading = () => {
  const [skeleton, setSkeleton] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      setSkeleton(prevState => [...prevState, i]);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container max-w-5xl mx-auto px-6 md:px-12 my-10">
      <div className="font-bold text-xl">Market</div>
      {skeleton.map(item => (
        <div className="flex items-center mb-3 mt-5 px-3" key={item}>
          <Skeleton
            sx={{backgroundColor: "rgba(41, 54, 68)",
              width: "40px",
              minWidth: "40px",
              height: "40px",
              marginRight: "10px"
            }}
            animation="wave"
            variant="circular"
          />
          <Box component="div" variant="div" sx={{ width: "100%" }}>
            <Skeleton
              sx={{ backgroundColor: "rgba(41, 54, 68)" }}
              animation="wave"
              height={40}
            />
          </Box>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;