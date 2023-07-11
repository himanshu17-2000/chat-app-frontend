import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContexts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "../components/Authentication";
import Chat from "../components/Chats/Chat";

export default function AppRoutes() {
  const { loggedinUser, id, setLoggedinUser, setId } = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="" element={<Chat />} />
          <Route exact path="authenticate" element={<Authentication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
