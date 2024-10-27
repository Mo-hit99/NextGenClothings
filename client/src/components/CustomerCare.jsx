import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useCallback } from "react";
import { timeAgo } from "../assets/Timeago";
const socket = io(`${import.meta.env.VITE_SERVER_LINK}`); // Connect to the Socket.io server
export default function CustomerCare() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [msgMode ,setMsgMode] = useState(false);
  const [image, setImage] = useState(null);
  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const userData = JSON.parse(user_info);
// msg opner
function msgOpner(){
  setMsgMode(!msgMode)
}
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().catch((error) =>
        console.error("Notification permission error:", error)
      );
    }
  }, []);

  // Function to trigger notification when a message is received
  const triggerNotification = useCallback((message) => {
    if (Notification.permission === "granted" && document.hidden) {
      const notification = new Notification("New Message", {
        body: `${message.sender}: ${message.content}`,
        icon: './src/assets/svg/openart-image_CZzVmoz-_1729959679734_raw.jpg', // Replace with your icon path
      });

      // Optional: Add a click event for the notification
      notification.onclick = () => {
        window.focus(); // Bring the tab into focus
        notification.close(); // Close the notification
      };
    }
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if email is available
        const email = UserEmail || (userData && userData.email);
        if (!email) {
          console.log("No email found to search for user.");
          return; // Exit if email is not available
        }
        const response = await axios.get(
          import.meta.env.VITE_SERVER_LINK + `/api/user`
        );
        if (response.data) {
          // const currentUser = response.data.find(
          //   (user) => user.email === UserEmail || user.email === userData.email
          // ); // Find user by email
          const currentUser = response.data.find(
            (user) => user.email === email
          );
          if (currentUser) {
            setUserId(currentUser._id); // Set user ID
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (UserEmail || (userData && userData.email)) {
      fetchUserData();
    }
  }, [UserEmail, userData]);

  useEffect(() => {
    const getUserById = async () => {
      if (!userId) return; // Ensure userId is not null

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_LINK}/api/user/${userId}`
        );
        if (response) {
          setSender(response.data.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserById();
  }, [userId]);
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_LINK}/api/messages`
      );
      setMessages(response.data);
    };
    fetchMessages();

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      triggerNotification(message); // Show notification for new message
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [triggerNotification]);

  const formData = new FormData();
  if (sender) formData.append("sender", sender); // Adjust to include user info
  if (content) formData.append("content", content); // Append only if content exists
  if (image) formData.append("product-img", image); // Append only if image exists
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the sender and content fields are properly set
    if (!sender || !content) {
      console.error("Sender or content is missing");
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_LINK}/api/messages`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    socket.emit("sendMessage", response.data);
    setContent("");
    setImage(null);
  };

  return (
    // <div>
    //     <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
    //         {messages.map((msg) => (
    //             <div key={msg._id}>
    //                 <strong>{msg.sender}</strong>: {msg.content}
    //                 {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded" width="100" />}
    //             </div>
    //         ))}
    //     </div>
    //     <form onSubmit={handleSubmit} encType="multipart/form-data">
    //         <input
    //             type="text"
    //             value={content}
    //             onChange={(e) => setContent(e.target.value)}
    //             placeholder="Type your message"
    //         />
    //         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
    //         <button type="submit">Send</button>
    //     </form>
    // </div>
    <section className="chat-section">
      <h1 className="customer-care-title" >Customer Care</h1>
      <button  className="start-chat-button" onClick={()=> msgOpner()}>Start Chat</button>
      {msgMode && 
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div
            key={msg._id}
            className={`message ${
              msg.sender === sender ? "sender-message" : "receiver-message"
              }`}
            >
              <strong>{msg.sender}</strong>: {msg.content}
              {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded" />}
              <p className="msg-timeStamp">{timeAgo(msg.timestamp)}</p>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="chat-input"
          >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your Query"
            />
          <label htmlFor="file-input" className="upload-label">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                />
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </label>
          <input
            id="file-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            />
          <button type="submit">Send</button>
        </form>
      </div>
      }
    </section>
  );
}
