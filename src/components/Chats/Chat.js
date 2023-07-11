import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import { toFormData } from "axios";
import ChatContacts from "./ChatContacts";
import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import { uniqBy } from "lodash";
function Chat() {
  const navigate = useNavigate();

  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
    console.log({ event, messageData });
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages(prev => ([...prev, {...messageData}]));
      }
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessage,
        sender: id,
      })
    );
    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      { text: newMessage, isOur: true, sender: id },
    ]);
   
  };

  const onlinePeopleExcludeOurUser = { ...onlinePeople };
  delete onlinePeopleExcludeOurUser[id];

  const messagesWithoutDuplicate = uniqBy(messages, "id");

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
            sendMessage={sendMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            selectedUserId={selectedUserId}
            messagesWithoutDuplicate={messagesWithoutDuplicate}
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
