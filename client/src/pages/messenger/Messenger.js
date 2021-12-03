import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((following) => users.some((u) => u.userId === following))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {}
    };

    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get("/messages/" + currentChat?._id);
          setMessages(res.data);
        } catch (err) {}
      }
    };
    
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="grid grid-rows-content">
      <Topbar />

      <div className="h-messenger grid grid-cols-layout-desktop">
        <div className="h-full p-4 border-r-2 border-solid border-gray-100">
          {/* <input placeholder="Search for friends" className="w-full py-3 border-0 border-b border-solid border-gray-600 outline-none" /> */}
          
          { conversations.map((conversation, index) => (
            <div key={index} className="flex flex-col mt-5" onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          )) }
        </div>

        <div className="flex flex-col items-center h-full">
          { currentChat ? (
            <>
              <div className="w-full h-chat p-4 overflow-y-auto">
                { messages.map((message, index) => (
                  <div key={index} ref={scrollRef} className={message.sender === user._id ? 'flex justify-start' : 'flex justify-end'}>
                    <Message message={message} own={message.sender === user._id} />
                  </div>
                )) }
              </div>

              <div className="flex items-center justify-between w-full p-4 border-t-2 border-solid border-gray-300">
                <input
                  className="w-10/12 h-full pl-4 rounded-3xl bg-gray-100 outline-none"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />

                <button className="py-2 px-4 bg-tiffany text-white font-semibold hover:bg-blue_green" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="text-44 text-gray-300">
              Open a conversation to start a chat.
            </span>
          ) }
        </div>

        <div className="h-full p-4 border-l-2 border-solid border-gray-100">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </ main>
  );
}

export default Messenger;