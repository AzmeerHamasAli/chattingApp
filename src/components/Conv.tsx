import { useState } from "react";
import "../../output.css";
import ConvSlab from "./ConvSlab";

interface ConvProps {
   addChat: () => void;
   setActiveChatId: (id: string) => void;
   allChats: IChat[];
   activeChatId: string;
}
const Conv: React.FC<ConvProps> = (props) => {
   // const convRef = useRef<HTMLDivElement | null>(null);

   return (
      <div className="bg-white flex flex-col gap-4  h-screen w-96 border-r font-poppins">
         {/* CONV HEADER */}
         <div className="px-4 h-16 items-center py-2 bg-white flex justify-between">
            <div className="flex items-center gap-2">
               <span className="text-xl font-semibold">ASKYOURPDF</span>
               <div className="text-green-500 text-xs  h-max px-1 text-center rounded-2xl bg-green-200">
                  <span>Free</span>
               </div>
            </div>
            <button className="bg-black text-orange-300 px-4 py-2 font-medium rounded-xl">Upgrade</button>
         </div>
         {/*New Conversations */}
         <div className="px-6">
            <button className="bg-black text-white font-medium w-full py-4 rounded-2xl " onClick={props.addChat}>
               +New Conversation
            </button>
         </div>
         {/* COVERSATIONS */}
         <div className="flex flex-col gap-4">
            {props.allChats.map((e, i) => (
               <ConvSlab
                  activeChatId={props.activeChatId}
                  chat={e}
                  onClick={() => {
                     props.setActiveChatId(e.id);
                     console.log("active");
                  }}
               ></ConvSlab>
            ))}

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
