import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load Gemini API key from .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function AIChatbot() {
  const [messages, setMessages] = useState([
    { sender: "Inquiro", text: "👋 Hello! I'm Inquiro. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🤖 QnAbot</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "300px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "You" ? "right" : "left", margin: "8px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <p><em>Inquiro is thinking...</em></p>}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "8px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChatbot;
