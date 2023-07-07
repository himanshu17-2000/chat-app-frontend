import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
  const [id, setId] = useState(null);
  const [loggedinUser, setLoggedinUser] = useState(null);
  return (
    <UserContext.Provider value={{ loggedinUser, setLoggedinUser, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
