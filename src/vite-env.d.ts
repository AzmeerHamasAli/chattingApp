/// <reference types="vite/client" />
interface IMessage {
   text: string;
   sender: "me" | "you";
   time: string;
}
