import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={`flex flex-col mb-6 py-3 px-5 rounded-lg ${own ? "bg-blue_green" : "bg-red-700"}`}>
      <p className="text-white text-16">{message.text}</p>

      <div className="mt-2 text-white text-12">{ format(message.createdAt) }</div>
    </div>
  );
}

export default Message;