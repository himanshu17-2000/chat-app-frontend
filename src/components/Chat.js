import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContexts";
import { useNavigate } from "react-router";
function Chat() {
  const navigate = useNavigate();
  const { loggedinUser, id, setLoggedinUser, setId } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/authenticate");
    }
  }, []);
  return (
    <div>
      <h1>Welcome to the Chat app</h1>
      <button
        onClick={(e) => {
          localStorage.removeItem("token");
          navigate("/authenticate");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {" "}
        logout
      </button>{" "}
    </div>
  );
}

export default Chat;
