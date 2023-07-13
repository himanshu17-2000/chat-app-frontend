import React from "react";
import ChatPerson from "./ChatPerson";

export default function ChatContacts({
  onlinePeopleExcludeOurUser,
  setSelectedUserId,
  selectedUserId,
  offlinePeople
}) {
  return (
    <>
      {Object.keys(onlinePeopleExcludeOurUser).map((userId) => (
        <ChatPerson
          id={userId}
          username={onlinePeopleExcludeOurUser[userId]}
          onClick={(userId) => setSelectedUserId(userId)}
          selected={userId === selectedUserId}
          online={true}
        />
      ))}
      {Object.keys(offlinePeople).map((userId) => (
        <ChatPerson
          id={userId}
          username={offlinePeople[userId]}
          onClick={(userId) => setSelectedUserId(userId)}
          selected={userId === selectedUserId}
          online={false}
        />
      ))}

    </>
  );
}
