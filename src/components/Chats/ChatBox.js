import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContexts";
function ChatBox({
  sendMessage,
  selectedUserId,
  newMessage,
  messages,
  setNewMessage,
  messageWithoutDupes,
}) {

  const divUnderMessages = useRef();
  useEffect(() => {
    const div = divUnderMessages.current
    console.log("messages aupdated auto scoll should happeend")
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: 'end' })
    }

  }, [messages])

  const { loggedinUser, id, setLoggedinUser, setId } = useContext(UserContext);
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

        {!!selectedUserId && (
          <div className="relative h-full">
            <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2"
              style={{ maxHeight: "100%", overflowY: "auto" }}>
              {messageWithoutDupes.map(message => (
                <div key={message._id} className={(message.sender === id ? 'text-right' : 'text-left')}>
                  <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " + (message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500')}>
                    {message.text}<br />
                    {message.sender}<br />
                    {id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div ref={divUnderMessages}></div>
      </div>
      {!!selectedUserId && (
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
            onClick={(e) => sendMessage(e)}
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
      )}
    </>
  );
}

export default ChatBox;
