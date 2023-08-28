import { useState } from "react";
import "../../output.css";

async function copyText(text: string) {
   try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
   } catch (err) {
      console.error("Failed to copy text: ", err);
   }
}

const Message: React.FC<IMessage> = (props) => {
   if (props.text !== "") {
      if (props.sender === "me") {
         return (
            <div className="flex  w-full justify-end gap-3">
               <div>
                  <div className="flex items-center gap-2">
                     <button
                        onClick={() => {
                           copyText(props.text);
                        }}
                     >
                        <i className="fas fa-copy  text-gray-400"></i>
                     </button>
                     <div className="bg-black  text-white  rounded-2xl px-3 max-w-lg border  py-4 w-max">
                        <span>{props.text}</span>
                     </div>
                  </div>
                  <div className="flex  justify-end">
                     <span className="text-sm">{props.time}</span>
                  </div>
               </div>
               <div>
                  <i className="fas fa-user-circle text-2xl"></i>
               </div>
            </div>
         );
      } else {
         return (
            <div className="flex w-full justify-start gap-3">
               <div>
                  <i className="fas fa-user-circle text-2xl"></i>
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <div className="bg-white  rounded-2xl px-3 max-w-lg border  py-4 w-max">
                        <span>{props.text}</span>
                     </div>
                     <button
                        onClick={() => {
                           copyText(props.text);
                        }}
                     >
                        <i className="fas fa-copy  text-gray-400"></i>
                     </button>
                  </div>
                  <div>
                     <span className="text-sm">{props.time}</span>
                  </div>
               </div>
            </div>
         );
      }
   }
};
export default Message;
