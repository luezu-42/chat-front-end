import React from "react";
import { withRouter, Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

function Chat({ match, socket }) {
  const chatroomId = match.params.id;
  console.log(chatroomId);
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  const [name, setName] = React.useState("");

  const RoomName = async () => {
    try {
      const response = await axios.get(`http://52.67.60.183:3000/${chatroomId}`);
      setName(response.data.name)
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });
      messageRef.current.value = "";
    }
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        console.log(message);
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  RoomName()
  return (
    <>


<div style={{overscrollBehavior: "none"}}>
      <div
        class="fixed w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md"
        style={{top:"0px", overscrollBehavior: "none"}}
      >
        <Link to="/group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-12 h-12 my-1 text-green-100 ml-2"
          >
            <path
              class="text-green-100 fill-current"
              d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
            />
          </svg>
        </Link>
        <div class="my-3 text-green-100 font-bold text-lg tracking-wide">{name}</div>
        <span></span>
      </div>

      <div class="mt-20 mb-16 ">
      {messages.map((message, i) => (
              <div key={i} className="clearFix">
                <span
                  className={
                    userId === message.userId ? "bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix text-right font-sans" : "bg-gray-300 float-left w-3/4 mx-4 my-2 p-2 rounded-lg clearfix font-serif"
                  }
                > <div className="font-serif text-white font-bold">{message.name}</div>
                 {message.message}
                </span>
                
              </div>
            ))}
      </div>
    </div>

    <div class="fixed w-full flex justify-between bg-green-100" style={{bottom: "0px"}}>
      <input
        class="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
        rows="1"
        name="message"
                placeholder="Degite uma mensagem!"
                ref={messageRef}
        style={{outline: "none"}}
      ></input>
      <button class="m-2" style={{outline: "none"}} onClick={sendMessage}>
        <svg
          class="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
          />
        </svg>
      </button>
    </div>
    </>
  );
}

export default withRouter(Chat);
