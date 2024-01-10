import React from "react";
import { Button, IconButton } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import StyledSearchInput from "./SearchInput";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ setFilter }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearch = (searchTerm) => {
    setFilter(searchTerm);
  };

  const handleAccountClick = () => {
    navigate("/AccountAdmin");
  };

  return (
    <>
      <Stack spacing={2} direction="row" sx={{ justifyContent: "space-between" }}>
        <Button variant="text" sx={{ color: "custom.white" }} onClick={handleHomeClick}>
          Home
        </Button>
        <StyledSearchInput onSearch={handleSearch} />
        <IconButton sx={{color:"custom.white"}}  onClick={handleAccountClick}>
          <AccountCircleIcon />
      </IconButton>
      </Stack>
    </>
  );
};

export default Header;
