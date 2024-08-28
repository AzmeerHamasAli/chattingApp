import React, { useEffect, useState } from "react";
import { IChat, IMessage } from "../App";
import Chat from "../components/Chat";
import Conv from "../components/Conv";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const Home = () => {
  //State / Const
  const now = new Date();
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState("");
  const [token, setToken] = useState("");
  const [myNumber, setNumber] = useState("");
  const [reciverNumber, setRecieverNumber] = useState("");
  const [allChats, setAllChats] = useState<IChat[]>([]);

  //Functions

  function formatTime(date: Date) {
    let hours = date.getHours();

    return `${hours}:${date.getMinutes()}`;
  }
  const setMessagesOfActiveChat = (messages: IMessage[]) => {
    const activeChatIndex = allChats.findIndex(
      (chat) => chat.id === activeChatId
    );
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
        number: "+010101010",
        messages: [
          {
            text: "Hello, how may I help you?",
            sender: "you",
            time: formatTime(now),
            date: formatTime(now),
          },
        ],
      },
      ...allChats,
    ];
    setAllChats(newChat);
  };
  const decodeToken = () => {
    if (token) {
      const decoded = jwtDecode(token);
      //@ts-ignore
      setNumber(decoded.number);
    }
  };
  const transformToIChat = (data: { [key: string]: any[] }): IChat[] => {
    return Object.keys(data).map((number, index) => {
      const messages: IMessage[] = data[number].map((msg) => ({
        text: msg.body,
        sender: msg.direction === "inbound" ? "you" : "me",
        time: msg.time,
        date: msg.date,
      }));

      return {
        id: (index + 1).toString(),
        number,
        messages,
      };
    });
  };

  //APIS
  const fetchMessages = async () => {
    const protocol = import.meta.env.VITE_API_REQUEST_PROTOCOL;
    const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;
    const url = `${protocol}://${domain}`;
    await axios
      .post(`${url}/fetchMessages`, {
        number: myNumber,
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data.data);
          const chatData: IChat[] = transformToIChat(res.data.data);
          setAllChats(chatData);
        } else {
          console.log(res);
        }
      });
  };
  const connectSocket = async () => {
    const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;

    const socket = new WebSocket(`wss://${domain}`);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("New message received:", message);
      // Handle the incoming message (e.g., update the chat UI)
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  };

  // Effects
  useEffect(() => {
    let token = Cookies.get("token");
    token ? setToken(token) : navigate("/login");
    connectSocket();
  }, []);
  useEffect(() => {
    if (myNumber && allChats.length == 0) fetchMessages();
  }, [myNumber]);
  useEffect(() => {
    if (token) {
      decodeToken();
    }
  }, [token]);

  //Retuurn
  return (
    <div className="w-screen h-screen flex relative ">
      <Conv
        setReciverNumber={setRecieverNumber}
        addChat={addNewChat}
        activeChatId={activeChatId}
        allChats={allChats}
        setActiveChatId={setActiveChatId}
      ></Conv>
      {reciverNumber.length > 0 ? (
        <Chat
          number={myNumber}
          recieverNumber={reciverNumber}
          id={activeChatId}
          setMessages={setMessagesOfActiveChat}
          allMessages={
            allChats.find((x) => x.id === activeChatId)?.messages || []
          }
        ></Chat>
      ) : (
        <div className="flex-grow bg-gray-200"></div>
      )}
    </div>
  );
};
