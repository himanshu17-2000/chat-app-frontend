import React from "react";
import ChatAvatar from "./ChatAvatar";

export default function ChatContacts({
  onlinePeopleExcludeOurUser,
  setSelectedUserId,
  selectedUserId,
}) {
  return (
    <>
      {Object.keys(onlinePeopleExcludeOurUser).map((userId) => (
        <div
          onClick={() => {
            setSelectedUserId(userId);
          }}
          className={`py-2 pl-4 rounded mt-1 ml-1  flex items-center gap-2 cursor-pointer ${
            userId === selectedUserId
              ? " bg-purple-500 border-l-4 border-purple-900"
              : ""
          }`}
          key={userId}
        >
          <ChatAvatar
            username={onlinePeopleExcludeOurUser[userId]}
            userId={userId}
          />
          <span
            className={`p-1  ${
              userId === selectedUserId ? " text-white " : " text-purple-950"
            }`}
          >
            {" "}
            {onlinePeopleExcludeOurUser[userId]}
          </span>
        </div>
      ))}
    </>
  );
}
