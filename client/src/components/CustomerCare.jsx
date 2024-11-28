import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useCallback } from "react";
import { ShowByTime } from "../assets/ShowByTime";
const socket = io(`${import.meta.env.VITE_SERVER_CUSTOMERCARE_LINK}`); // Connect to the Socket.io server
export default function CustomerCare() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [sender, setSender] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [msgOptionModel, SetMsgOptionModel] = useState(null);
  const [msgMode, setMsgMode] = useState(false);
  const [image, setImage] = useState(null);
  const UserEmail = localStorage.getItem("email");
  const user_info = localStorage.getItem("user-info");
  const token = localStorage.getItem('token')
  const userData = JSON.parse(user_info);
  // msg opner
  function msgOpner() {
    setMsgMode(!msgMode);
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
        icon: "./src/assets/svg/openart-image_CZzVmoz-_1729959679734_raw.jpg", // Replace with your icon path
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
          import.meta.env.VITE_SERVER_USER_LINK + `/users/api/user`
        );
        if (response.data) {
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
          `${import.meta.env.VITE_SERVER_USER_LINK}/users/api/user/${userId}`
        );
        if (response) {
          setSender(response.data.name);
          setSenderEmail(response.data.email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserById();
  }, [userId]);
  useEffect(() => {
    fetchMessages();
  },[]);
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_CUSTOMERCARE_LINK}/chat/api/messages`
      );
      setMessages(response.data);
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        triggerNotification(message); // Show notification for new message
      });

      return () => {
        socket.off("receiveMessage");
      };
    } catch (error) {
      console.log(error);
    }
  };
  const formData = new FormData();
  if (sender) formData.append("sender", sender); // Adjust to include user info
  if (senderEmail) formData.append("email", senderEmail);
  if (content) formData.append("content", content); // Append only if content exists
  if (image) formData.append("product-img", image); // Append only if image exists
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the sender and content fields are properly set
    if(!token && !userData?.token){
      setError('Please Login!!')
    }else{
      try {
        if (!sender || !content) {
          setError("Type Something....");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_CUSTOMERCARE_LINK}/chat/api/messages`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        socket.emit("sendMessage", response.data);
        setContent("");
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };
  function msgOptionToggle(msgId) {
    SetMsgOptionModel(msgOptionModel === msgId ? null : msgId);
  }
  async function deleteMessage(messageId) {
    try {
      const id = messageId;
      const response = await axios.delete(
        import.meta.env.VITE_SERVER_CUSTOMERCARE_LINK +
          `/chat/api/messages/delete/${id}`
      );
      if (response.status === 200) {
        fetchMessages();
        console.log("msg delete");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Clear the error when sender or content changes
  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (error) setError(null);
  };

  return (
    <section className="chat-section">
      <h1 className="customer-care-title">Customer support</h1>
      <button className="start-chat-button" onClick={() => msgOpner()}>
        Start Chat
      </button>
      {error && <p className="error-customer-care">{error}</p>}
      {msgMode && (
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message ${
                    msg.sender === sender
                      ? "sender-message"
                      : "receiver-message"
                  }`}
                >
                  {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded" />}
                  {msg.content}
                  <p className="sender-name">{msg.sender}</p>
                  <p className="msg-timeStamp">{ShowByTime(msg.timestamp)}</p>
                  <button
                    onClick={() => msgOptionToggle(msg._id)}
                    className="more-option-btn-sender-delete-msg"
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  {msgOptionModel === msg._id && (
                      <div className="msg-btn-container-wrapper">
                        <button
                          className="msg-comment-delete msg-btn"
                          onClick={() => deleteMessage(msg._id)}
                        >
                          delete
                        </button>
                      </div>
                    )}
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
              onChange={handleContentChange}
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
      )}
    </section>
  );
}
