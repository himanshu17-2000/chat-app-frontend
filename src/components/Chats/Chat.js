import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import { toFormData } from "axios";
import ChatContacts from "./ChatContacts";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
function Chat() {
  const navigate = useNavigate();
  const [onlinePeople, setOnlinePeople] = useState({});
  const [ws, setWs] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { loggedinUser, id, setLoggedinUser, setId } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/authenticate");
    } else {
      try {
        const user = decodeToken(localStorage.getItem("token"));
        setLoggedinUser(user.username);
        setId(user.id);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    // if (loggedinUser && id) toast.success("welcome " + loggedinUser);
    const ws = new WebSocket(
      "ws://localhost:5000",
      localStorage.getItem("token")
    );
    setWs(ws);
    ws.addEventListener("message", handleMessage);
  }, [loggedinUser, id]);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ id, username }) => {
      people[id] = username;
    });
    setOnlinePeople(people);
  };

  const handleMessage = (event) => {
    const messageData = JSON.parse(event.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  };

  const onlinePeopleExcludeOurUser = { ...onlinePeople };
  delete onlinePeopleExcludeOurUser[id];

  const selectContact = (userId) => {};
  return (
    <div>
      <div className="flex h-screen">
        <div className="bg-fuchsia-300  w-1/3 text-white ">
          <ChatHeader />
          <ChatContacts
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            onlinePeopleExcludeOurUser={onlinePeopleExcludeOurUser}
          />
        </div>
        <div className="bg-fuchsia-950 w-2/3 text-white p-2 flex flex-col">
          <ChatBox
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
      <div
        onClick={(e) => {
          localStorage.removeItem("token");
          setLoggedinUser(null);
          setId(null);
          navigate("/authenticate");
        }}
        className="border-bla p-1 flex-grow flex-1 bg-purple-500 text-center  "
      >
        <h1 className="text-white">LOGOUT</h1>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Chat;
