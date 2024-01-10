import React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: theme.palette.custom.black,
    backgroundColor: theme.palette.custom.white,
    borderRadius: "30px",
  },
}));

const StyledSearchInput = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  return (
    <SearchInput
      placeholder="Search"
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "custom.black" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default StyledSearchInput;
