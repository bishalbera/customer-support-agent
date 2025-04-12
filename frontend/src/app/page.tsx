"use client";

import { useState } from "react";
import axios from "axios";
import { FaPlaneDeparture } from "react-icons/fa";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages([...messages, userMessage]);

    const res = await axios.post("http://localhost:8001/agent", {
      question: input,
    });
    console.log(res);

    const botMessage = {
      from: "bot",
      text: res.data.response || "No response",
    };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-sky-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <FaPlaneDeparture size={30} className="text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-800">Flight Assistant</h1>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 flex flex-col gap-4 h-[70vh] overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-3 rounded-xl ${
              msg.from === "user"
                ? "self-end bg-blue-100 text-right"
                : "self-start bg-gray-100 text-black" 
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your flights..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-black"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </main>
  );
}
