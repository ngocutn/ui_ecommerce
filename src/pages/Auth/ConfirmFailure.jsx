import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError } from "../../store/slice/userSlice";

export default function ConfirmFailure() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleResend = () => {
    dispatch(clearAllError());
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="h-screen bg-white p-10 rounded-md shadow-primary"
    >
      <Box
        component="img"
        src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
        alt="failure"
        className="w-[200px]"
      />
      <Typography variant="h3" gutterBottom>
        Confirmation Failed
      </Typography>

      <Typography variant="body1" gutterBottom>
        Please try again, the confirmation link has expired or is invalid.
      </Typography>

      {error && (
        <Typography variant="body1" className="text-red-500 mt-2">
          {error}
        </Typography>
      )}
      <Button variant="contained" onClick={handleResend} className="mt-5">
        Back to Login
      </Button>
    </Box>
  );
}
