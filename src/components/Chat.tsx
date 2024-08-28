import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import React from "react";
import axios from "axios";
function formatTime(date: Date) {
  let hours = date.getHours();

  return `${hours}:${date.getMinutes()} `;
}
interface ChatProps {
  setMessages: (messages: any[]) => void;
  id: string;
  allMessages: any[];
  number: string;
  recieverNumber: string;
}

const Chat: React.FC<ChatProps> = (props) => {
  //CONST
  const now = new Date();
  const [message, setMessage] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  //Functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //API
  const sendMessage = async () => {
    console.log("send MEssage");
    const protocol = import.meta.env.VITE_API_REQUEST_PROTOCOL;
    const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;
    const url = `${protocol}://${domain}`;
    await axios
      .post(`${url}/sendMessage`, {
        from: props.number,
        to: props.recieverNumber,
        message: message,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res);
        }
      });
  };

  //Effects
  useEffect(() => {
    containerRef.current?.scrollTo({
      behavior: "smooth",
      top: containerRef.current.scrollHeight,
    });
  }, [props.allMessages]);
  return (
    <div className="flex-grow  flex font-poppins bg-bodyColor flex-col ">
      {/* Top Bar  */}

      <div className="bg-white flex justify-between items-center h-16 px-12 py-2">
        <div className="flex items-center gap-x-2">
          <i className="fas fa-user-circle text-4xl"></i>
          <div className="flex flex-col ">
            <span>{props.recieverNumber}</span>
          </div>
        </div>
        <button onClick={() => {}}>
          <i className="fas fa-ellipsis-v text-xl"></i>
        </button>
      </div>
      {/* Announcement Bar */}
      <div className="bg-barColor  flex items-center justify-center py-2  ">
        <p className="text-xs ">Ask me about anything</p>
      </div>
      {/* Messages Section */}
      <div
        ref={containerRef}
        className=" flex-grow flex flex-col gap-10 overflow-y-auto px-12 py-4 "
      >
        {props.allMessages.map((e) => (
          <Message {...e}></Message>
        ))}
      </div>
      {/* Type Message Section */}
      <div className=" px-12 mb-10   flex gap-2">
        <div className="flex items-center flex-grow relative">
          <input
            type="text"
            value={message}
            onKeyDown={(event) => {
              const now = new Date();

              if (event.key == "Enter") {
                sendMessage();
                props.setMessages([
                  ...props.allMessages,
                  {
                    text: message,
                    sender: "me",
                    time: formatTime(now),
                  },
                ]);
                setMessage("");
              }
            }}
            onChange={handleInputChange}
            className="border inputText flex-grow outline-gray-300 outline-4 w-full rounded-3xl h-12 px-10 "
            placeholder="Hi... "
          />

          <button
            onClick={() => {
              sendMessage();
              const now = new Date();

              props.setMessages([
                ...props.allMessages,
                { text: message, sender: "me", time: formatTime(now) },
              ]);
              setMessage("");
              console.log(containerRef.current);
            }}
            className="px-2 py-1   bg-black rounded-full absolute right-2"
          >
            <i className="fas fa-paper-plane  text-white"></i>
          </button>
        </div>
      </div>
      {/* Dailouge Box */}
      <div className="absolute w-screen  top-0 left-0 hidden dailougeBox h-screen  items-center justify-center">
        <div className="absolute w-screen  h-screen blur-background bg-black"></div>
        <div className="flex flex-col gap-6 w-96 items-center bg-white z-20 px-4 py-8 rounded-2xl">
          <span className="font-semibold">Clear Conversation History</span>
          <span className="text-center text-sm">
            Are you sure you want to clear your conversation history?
          </span>
          <button
            onClick={() => {
              document.querySelector(".dailougeBox")?.classList.add("hidden");
            }}
            className="w-full bg-black text-white font-semibold rounded-2xl py-4"
          >
            Go Back
          </button>
          <button
            className="text-red-500  font-semibold"
            onClick={() => {
              const now = new Date();

              props.setMessages([
                {
                  text: "Hello, I am here to help you out",
                  sender: "you",
                  time: formatTime(now),
                },
              ]);
              document.querySelector(".dailougeBox")?.classList.add("hidden");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
