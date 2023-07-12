import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContexts";
function ChatBox({
  sendMessage,
  selectedUserId,
  newMessage,
  messages,
  setNewMessage,
  messageWithoutDupes
}) {
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
        {/* {!!selectedUserId && (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                {messagesWithoutDupes.map(message => (
                  <div key={message._id} className={(message.sender === id ? 'text-right': 'text-left')}>
                    <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " +(message.sender === id ? 'bg-blue-500 text-white':'bg-white text-gray-500')}>
                      {message.text}
                      {message.file && (
                        <div className="">
                          <a target="_blank" className="flex items-center gap-1 border-b" href={axios.defaults.baseURL + '/uploads/' + message.file}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                            {message.file}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))} */}
        {!!selectedUserId && (
          <div className="relative h-full">
            <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
              {messageWithoutDupes.map(message => (
                <div key={message._id} className={(message.sender === id ? 'text-right' : 'text-left')}>
                  <div className={"text-left inline-block p-2 my-2 rounded-md text-sm " + (message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500')}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
