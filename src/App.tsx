import { useEffect, useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Chat from "./components/Chat";
import Nav from "./components/Nav";
import Conv from "./components/Conv";
import "../output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Switch } from "react-router-dom";
function App() {
   function formatTime(date: Date) {
      let hours = date.getHours();

      return `${hours}:${date.getMinutes()}`;
   }
   const [activeChatId, setActiveChatId] = useState("0");
   const now = new Date();
   const [allChats, setAllChats] = useState<IChat[]>([
      { id: "0", messages: [{ text: "Hello, how may I help you?", sender: "you", time: formatTime(now) }] },
   ]);
   const setMessagesOfActiveChat = (messages: IMessage[]) => {
      const activeChatIndex = allChats.findIndex((chat) => chat.id === activeChatId);
      const activeChat = allChats[activeChatIndex];
      if (activeChat) {
         const newChats: IChat[] = [
            ...allChats.slice(0, activeChatIndex),
            { ...activeChat, messages },
            ...allChats.slice(activeChatIndex + 1),
         ];
         setAllChats(newChats);
      }
   };
   const largestIndex = () => {
      let largestNumber = Number.NEGATIVE_INFINITY;

      allChats.forEach((e) => {
         if (+e.id > largestNumber) {
            largestNumber = +e.id;
         }
      });
      largestNumber = largestNumber + 1;
      return largestNumber.toString();
   };
   const addNewChat = () => {
      const now = new Date();

      const newChat: IChat[] = [
         {
            id: largestIndex(),
            messages: [{ text: "Hello, how may I help you?", sender: "you", time: formatTime(now) }],
         },
         ...allChats,
      ];
      setActiveChatId(largestIndex());
      setAllChats(newChat);
   };
   return (
      <BrowserRouter>
         <div className="w-screen h-screen flex relative">
            <Nav></Nav>
            <Conv
               addChat={addNewChat}
               activeChatId={activeChatId}
               allChats={allChats}
               setActiveChatId={setActiveChatId}
            ></Conv>
            <Chat
               allMessages={allChats.find((x) => x.id === activeChatId)?.messages || []}
               id={activeChatId}
               setMessages={setMessagesOfActiveChat}
            ></Chat>
         </div>
      </BrowserRouter>
   );
}

export default App;
