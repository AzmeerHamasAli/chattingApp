import React, { useEffect, useState } from "react";
import { IChat, IMessage } from "../App";
import Chat from "../components/Chat";
import Conv from "../components/Conv";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { io } from "socket.io-client";

export const Home = () => {
  //State / Const
  const now = new Date();
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState("");
  const [token, setToken] = useState("");
  const [myNumber, setNumber] = useState("");
  const [reciverNumber, setRecieverNumber] = useState("");
  const [allChats, setAllChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(false);

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

  const convertDataToChats = (
    data: any[],
    userPhoneNumber: string
  ): IChat[] => {
    return data.map((chat) => {
      const messages = chat.messages.map((message: any) => {
        const date = new Date(message.dateCreated);
        const formattedDate = date.toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
        const formattedTime = date.toISOString().split("T")[1].split(".")[0]; // Extract time (HH:MM:SS)

        return {
          text: message.body,
          sender: message.author === userPhoneNumber ? "me" : "you",
          time: formattedTime,
          date: formattedDate,
        };
      });

      return {
        messages,
        number: chat.messages[0].author, // Use the sender's number from the first message
        id: chat.conversationSid,
      };
    });
  };

  //APIS
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const protocol = import.meta.env.VITE_API_REQUEST_PROTOCOL;
      const domain = import.meta.env.VITE_API_REQUEST_DOMAIN;
      const url = `${protocol}://${domain}`;

      const res = await axios.post(`${url}/fetchConversations`, {
        number: myNumber,
      });

      if (res.status === 200) {
        console.log(res);
        if (myNumber) {
          const allChats = convertDataToChats(res.data, myNumber);
          setAllChats(allChats);
        }
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("An error occurred while fetching messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    let token = Cookies.get("token");
    token ? setToken(token) : navigate("/login");
    // connectSocket();
  }, []);
  useEffect(() => {
    // if (myNumber && allChats.length == 0) fetchMessages();
    setInterval(async () => {
      myNumber && fetchMessages();
    }, 1000);
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
        loading={loading}
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
