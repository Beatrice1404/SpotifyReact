import React from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom"; 
import AccountAdmin from "./AccountAdmin"; 

import Genres from "./Genres";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Genres />} />
      <Route path="/Genres/:id" element={<Genres />} />
      <Route path="/AccountAdmin" element={<AccountAdmin />} />
    </ReactRoutes>
  )
};

export default Routes;


