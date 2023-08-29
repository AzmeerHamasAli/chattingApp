import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "../../output.css";
function formatTime(date: Date) {
   let hours = date.getHours();

   return `${hours}:${date.getMinutes()} `;
}
interface ChatProps {
   setMessages: (messages: IMessage[]) => void;
   id: string;
   allMessages: IMessage[];
}
const Chat: React.FC<ChatProps> = (props) => {
   const now = new Date();
   const [message, setMessage] = useState<string>("");

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
   };
   const containerRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      containerRef.current?.scrollTo({ behavior: "smooth", top: containerRef.current.scrollHeight });
   }, [props.allMessages]);
   return (
      <div className="flex-grow  flex font-poppins bg-bodyColor flex-col ">
         {/* Top Bar  */}

         <div className="bg-white flex justify-between items-center h-16 px-12 py-2">
            <div className="flex items-center gap-x-2">
               <i className="fas fa-user-circle text-4xl"></i>
               <div className="flex flex-col ">
                  <span>AskYourPDF</span>
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
         <div ref={containerRef} className=" flex-grow flex flex-col gap-10 overflow-y-auto px-12 py-4 ">
            {props.allMessages.map((e) => (
               <Message {...e}></Message>
            ))}
         </div>
         {/* Type Message Section */}
         <div className=" px-12 mb-10   flex gap-2">
            <button
               onClick={() => {
                  document.querySelector(".dailougeBox")?.classList.remove("hidden");
                  // document.getElementById("root")?.classList.add("blur-background");
               }}
               className="bg-yellow-500  rounded-full px-3    hover:bg-red-600"
            >
               <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3626_4098)">
                     <path
                        d="M15.05 0.453808C14.55 0.253808 14 0.503808 13.8 1.00381L11.25 7.70381L13.1 8.40381L15.65 1.70381C15.85 1.20381 15.6 0.653808 15.05 0.453808Z"
                        fill="black"
                     ></path>
                     <path
                        d="M13.2999 13.2538L14.1999 10.9538L8.7999 8.90381L7.8999 11.2538L13.3499 13.3038L13.2999 13.2538Z"
                        fill="black"
                     ></path>
                     <path
                        d="M13.7998 15.5538L6.04983 12.6538L0.649834 16.8038C0.199834 17.1538 0.149834 17.7538 0.449834 18.1538L1.54983 19.6038C2.19983 20.4038 3.34983 20.8038 4.34983 20.6538C4.69983 20.6038 5.14983 20.7538 5.34983 21.0538L5.64983 21.4038C6.29983 22.2038 7.44983 22.6038 8.44983 22.4538L8.99983 22.3538C9.34983 22.3038 9.79983 22.4538 9.99983 22.7538L10.0498 22.8038C10.5998 23.5038 11.5498 23.9038 12.4498 23.9038C12.5998 23.9038 12.7498 23.9038 12.8998 23.8538C12.9498 23.8538 12.9998 23.8538 13.0498 23.8038L14.4998 23.3538C14.9998 23.2038 15.2498 22.7038 15.1498 22.2038L13.7998 15.5538ZM22.7498 15.9038H17.3498C16.7998 15.9038 16.3498 16.3538 16.3498 16.9038C16.3498 17.4538 16.7998 17.9038 17.3498 17.9038H22.7498C23.2998 17.9038 23.7498 17.4538 23.7498 16.9038C23.7498 16.3538 23.2998 15.9038 22.7498 15.9038ZM21.1498 19.6038H17.3498C16.7998 19.6038 16.3498 20.0538 16.3498 20.6038C16.3498 21.1538 16.7998 21.6038 17.3498 21.6038H21.1498C21.6998 21.6038 22.1498 21.1538 22.1498 20.6038C22.1498 20.0538 21.6998 19.6038 21.1498 19.6038Z"
                        fill="black"
                     ></path>
                  </g>
                  <defs>
                     <clipPath id="clip0_3626_4098">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.153809)"></rect>
                     </clipPath>
                  </defs>
               </svg>
            </button>
            <div className="flex items-center flex-grow relative">
               <input
                  type="text"
                  value={message}
                  onKeyDown={(event) => {
                     const now = new Date();

                     if (event.key == "Enter") {
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
                  placeholder="Ask any question about your document"
               />

               <button
                  onClick={() => {
                     const now = new Date();

                     props.setMessages([...props.allMessages, { text: message, sender: "me", time: formatTime(now) }]);
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
         <div className="absolute w-screen  top-0 left-0 hidden dailougeBox h-screen flex items-center justify-center">
            <div className="absolute w-screen  h-screen blur-background bg-black"></div>
            <div className="flex flex-col gap-6 w-96 items-center bg-white z-20 px-4 py-8 rounded-2xl">
               <span className="font-semibold">Clear Conversation History</span>
               <span className="text-center text-sm">Are you sure you want to clear your conversation history?</span>
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
