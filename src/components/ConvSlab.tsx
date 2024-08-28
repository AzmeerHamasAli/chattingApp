import classNames from "classnames";
import { IChat } from "../App";

interface ConvSlabProps {
  chat: IChat;
  onClick: () => void;
  activeChatId: string;
}
const ConvSlab: React.FC<ConvSlabProps> = (props) => {
  return (
    <div className="px-6" onClick={props.onClick}>
      <div
        className={classNames(
          "flex gap-3 border-b cursor-pointer slab hover:border-b-0 hover:bg-gray-200 px-2 py-2 hover:rounded-md border-gray-400 pb-2 ",
          {
            "border-b-0 bg-gray-200 rounded-md ":
              props.activeChatId === props.chat.id,
          }
        )}
      >
        <div>
          <i className="far text-black  text-lg fa-comment"></i>
        </div>
        <div className="flex flex-col">
          <span className="text-black text-lg font-medium">
            {props.chat.number}
          </span>
          <span className="text-gray-500 w-full truncate-lines  text-xs">
            {props.chat.messages[props.chat.messages.length - 1]?.text}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ConvSlab;
