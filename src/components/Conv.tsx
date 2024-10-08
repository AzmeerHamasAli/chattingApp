import { useState } from "react";
import ConvSlab from "./ConvSlab";
import React from "react";
import { IChat } from "../App";
interface ConvProps {
  addChat: () => void;
  setActiveChatId: (id: string) => void;
  allChats: IChat[];
  activeChatId: string;
  setReciverNumber: (e: any) => void;
  loading: boolean;
}
const Conv: React.FC<ConvProps> = (props) => {
  return (
    <div className="bg-white flex flex-col gap-4  h-screen w-96 border-r font-poppins  overflow-auto">
      {/* CONV HEADER */}
      <div className="px-4 h-16 items-center py-2 bg-white flex justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Messages</span>
          <div className="text-green-500 text-xs  h-max px-1 text-center rounded-2xl bg-green-200">
            <span>Online</span>
          </div>
        </div>
      </div>
      {/*New Conversations */}
      {/* <div className="px-6">
        <button
          className="bg-black text-white font-medium w-full py-4 rounded-2xl "
          onClick={props.addChat}
        >
          +New Conversation
        </button>
      </div> */}
      {/* COVERSATIONS */}
      <div className="flex flex-col gap-4">
        {props.loading ? (
          <span>Loading...</span>
        ) : props.allChats.length == 0 ? (
          <span>No conversations</span>
        ) : (
          props.allChats.map((chat, i) => (
            <ConvSlab
              key={i}
              activeChatId={props.activeChatId}
              chat={chat}
              onClick={() => {
                props.setReciverNumber(chat.number);
                props.setActiveChatId(chat.id);
              }}
            ></ConvSlab>
          ))
        )}

        {/* <ConvSlab id="1" messages={[{ text: "Mesaage sada", sender: "me", time: "21as" }]}></ConvSlab> */}
        {/* <button
               onClick={() => {
                  console.log(conversation);
               }}
            >
               22
            </button> */}
      </div>
    </div>
  );
};
export default Conv;
