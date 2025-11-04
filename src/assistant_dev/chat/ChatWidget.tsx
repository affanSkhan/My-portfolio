"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Lock, Globe } from "lucide-react";

type Mode = "public" | "private";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("public");
  const [pinOk, setPinOk] = useState(false);
  const [messages, setMessages] = useState<{role:"user"|"assistant";content:string}[]>([
    { role: "assistant", content: "Hello 👋 I'm Affan's AI Assistant. Ask about his work—or switch to Private if you're Affan." }
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(m => [...m, { role:"user", content: text }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ mode, pinOk, messages: [...messages, { role:"user", content:text }] })
    });
    const data = await res.json();
    setMessages(m => [...m, { role:"assistant", content: data.reply }]);
  }

  async function tryLogin() {
    const pin = prompt("Enter 4-digit PIN");
    if (!pin) return;
    const res = await fetch("/api/auth/pin", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ pin })
    });
    const data = await res.json();
    if (data.ok) {
      setPinOk(true);
      setMode("private");
      setMessages(m => [...m, { role:"assistant", content: "🔐 Private Mode enabled. You can now add/edit projects, skills, and about text." }]);
    } else {
      alert("Wrong PIN");
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(v=>!v)}
        className="fixed bottom-6 right-6 z-[60] p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700"
        aria-label="Open chat"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
            className="fixed bottom-20 right-6 z-[60] w-[92vw] max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="text-sm">
                <div className="font-semibold">Affan&apos;s AI Assistant</div>
                <div className="text-xs text-zinc-500">Ask about projects, skills, goals</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`text-xs px-2 py-1 rounded ${mode==="public"?"bg-zinc-200 dark:bg-zinc-800":""}`}
                  onClick={()=>{ setMode("public"); setPinOk(false); }}
                  title="Public Mode"
                ><Globe className="inline w-3.5 h-3.5 mr-1"/>Public</button>

                <button
                  className={`text-xs px-2 py-1 rounded ${mode==="private"?"bg-zinc-200 dark:bg-zinc-800":""}`}
                  onClick={()=> pinOk ? setMode("private") : tryLogin()}
                  title="Private Mode"
                ><Lock className="inline w-3.5 h-3.5 mr-1"/>Private</button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm ${m.role==="assistant"?"bg-zinc-100 dark:bg-zinc-800":"bg-indigo-50 dark:bg-indigo-900/30"} p-3 rounded-lg`}>
                  {m.content}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input
                value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none"
                onKeyDown={e => e.key === "Enter" && send()}
              />
              <button 
                onClick={send} 
                className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                title="Send message"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}