import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContexts";
function ChatBox({ selectedUserId, newMessage, setNewMessage }) {
  const { loggedinUser, id, setLoggedinUser, setId } = useContext(UserContext);
  const sendMessage = (e) => {};
  return (
    <>
      <div className="flex-grow">
        {!selectedUserId && (
          <div
            className="flex h-full flex-grow items-center 
          justify-center"
          >
            <div className=" text-fuchsia-300">
              {" "}
              &larr; please select a person
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 ">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          type="text"
          placeholder="type your message"
          className="flex-grow bg-white-300 text-black border p-2 rounded-sm "
        />
        <button
          onClick={sendMessage}
          className="bg-white text-slate-900 p-2 rounded-sm "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ChatBox;
