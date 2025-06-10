"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPlaneDeparture } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [waitMsg, setWaitMsg] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setWaitMsg("");

    timeoutRef.current = setTimeout(() => {
      setWaitMsg("Just a sec, we're fetching your data...");
    }, 30 * 1000);

    longTimeoutRef.current = setTimeout(() => {
      setWaitMsg("Hang tight! We’re surfing through a lot of data for you.");
    }, 60 * 1000);

    try {
      const res = await axios.post("http://localhost:8001/agent", {
        question: input,
      });

      const botMessage = {
        from: "bot",
        text: res.data.response || "No response",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setWaitMsg("");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (longTimeoutRef.current) clearTimeout(longTimeoutRef.current);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#fdf4f0] to-white flex flex-col items-center justify-center px-4 py-10 text-gray-800 font-serif">
      <div className="flex items-center gap-3 mb-6">
        <FaPlaneDeparture size={30} className="text-[#f85e9f]" />
        <h1 className="text-3xl font-bold text-gray-900">Swiss</h1>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-lg p-6 flex flex-col gap-4 h-[70vh] overflow-y-auto border border-[#f1e5e5]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm px-4 py-2 rounded-xl max-w-[80%] whitespace-pre-line ${
              msg.from === "user"
                ? "self-end bg-[#fef0ef] text-[#f85e9f]"
                : "self-start bg-[#f5f5f5] text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-[#f85e9f] animate-pulse">
            <AiOutlineLoading3Quarters className="animate-spin" />
            Bot is thinking...
          </div>
        )}

        {waitMsg && (
          <div className="text-xs text-[#f85e9f] italic">{waitMsg}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="w-full max-w-2xl mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything about your travel..."
          className="flex-1 px-4 py-2 border border-[#f3dede] bg-white rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f85e9f] placeholder:text-sm"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-[#f85e9f] text-white rounded-lg hover:bg-[#e7548e] transition"
        >
          Send
        </button>
      </div>
    </main>
  );
}
