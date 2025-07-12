import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "Inquiro",
      text: "👋 Hello! I'm Inquiro. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Popup toggle

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const botReply = result.response.text();
      const botMsg = { sender: "Inquiro", text: botReply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("❌ Inquiro API Error:", err);
      const errorMsg = { sender: "Inquiro", text: "❌ " + err.message };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background Blur when modal is open */}
      <div
        style={{
          filter: open ? "blur(4px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        {/* Your app content here */}
      </div>

      {/* Floating Circular AI Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          zIndex: 1000,
        }}
        aria-label="Open AI Chatbot"
      >
        ✨
      </button>

      {/* Chatbot Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "600px",
              width: "90%",
              height: "80vh",
              margin: "40px auto",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>🤖 Inquiro</h2>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖️
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: msg.sender === "You" ? "right" : "left",
                    margin: "8px 0",
                  }}
                >
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              {loading && (
                <p>
                  <em>Inquiro is thinking...</em>
                </p>
              )}
            </div>

            <div style={{ display: "flex" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: "10px" }}
              />
              <button
                onClick={sendMessage}
                style={{ padding: "10px", marginLeft: "8px" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatbot;
