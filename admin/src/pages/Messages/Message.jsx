import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Message.css";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  // Fetch all messages from the backend
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact");
      // Sort messages by creation date, newest first
      setMessages(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Error fetching messages:", err);
      alert("Failed to load messages."); // Using alert for simplicity, consider toastify
    }
  };

  // Delete a message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/contact/${id}`);
      alert("Message deleted successfully.");
      fetchMessages(); // Refresh message list
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message.");
    }
  };

  const handleReplyChange = (e) => setReply(e.target.value);

  const handleSendReply = async (messageId) => {
    if (!reply.trim()) {
      alert("Reply cannot be empty.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/contact/reply", {
        id: messageId,
        reply,
      });
      setReply("");
      setSelectedMessageId(null); // Close reply box
      alert(res.data.message);
      fetchMessages(); // Refresh messages to show the reply
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="admin-messages-container">
  

      {messages.length === 0 ? (
        <p className="no-messages-found">No messages yet.</p>
      ) : (
        <div className="messages-table-wrapper">
          <table className="messages-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Admin Reply</th>
                <th>Sent At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <React.Fragment key={msg._id}>
                  <tr>
                    <td data-label="Name">{msg.name}</td>
                    <td data-label="Email">{msg.email}</td>
                    <td data-label="Message">{msg.message}</td>
                    <td data-label="Admin Reply">
                      {msg.reply ? msg.reply : <span className="no-reply-text">No reply yet</span>}
                    </td>
                    <td data-label="Sent At">{new Date(msg.createdAt).toLocaleString()}</td>
                    <td data-label="Actions" className="actions-cell">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteMessage(msg._id)}
                      >
                        Delete
                      </button>
                      {!msg.reply && ( // Only show reply button if no reply exists
                        selectedMessageId === msg._id ? (
                          <div className="reply-actions">
                            <button
                              className="send-reply-btn"
                              onClick={() => handleSendReply(msg._id)}
                            >
                              Send
                            </button>
                            <button
                              className="cancel-reply-btn"
                              onClick={() => setSelectedMessageId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className="reply-btn"
                            onClick={() => setSelectedMessageId(msg._id)}
                          >
                            Reply
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                  {selectedMessageId === msg._id && !msg.reply && (
                    <tr className="reply-row">
                      <td colSpan="6"> {/* Span across all columns */}
                        <textarea
                          placeholder="Type your reply here..."
                          value={reply}
                          onChange={handleReplyChange}
                          className="reply-textarea"
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Message;