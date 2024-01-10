
import React from "react";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HeaderAccount = ({ onManageSongsClick, onManageCategoriesClick, onAddCategoryClick }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ justifyContent: "space-between" }}>
        <Button variant="text" sx={{ color: "custom.white" }} onClick={handleHomeClick}>
          Home
        </Button>
        <Button variant="contained" color="success" onClick={onManageSongsClick}>
          Manage Songs
        </Button>
        <Button variant="contained" color="success" onClick={onManageCategoriesClick}>
          Manage Categories
        </Button>
        <IconButton sx={{ color: "custom.white" }} onClick={onAddCategoryClick}>
          <AccountCircleIcon />
        </IconButton>
      </Stack>
    </>
  );
};

export default HeaderAccount;
