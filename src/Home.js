import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Albums from "./Albums";
import { Box } from "@mui/material";


const Home = () => {
    return (
        <>
    <Header />
    <Box display="flex">
      <Sidebar />
      <Albums />
    </Box>
        </>
    )
}

export default Home