"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Lock, Globe } from "lucide-react";

type Mode = "public" | "private";

// Simple markdown-to-JSX converter for basic formatting
function formatMessage(content: string) {
  // Split by lines to preserve line breaks
  const lines = content.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Handle list items
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={lineIndex} className="ml-4">
          {formatInlineMarkdown(line)}
        </div>
      );
    }
    
    // Handle headers
    if (line.trim().startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      const headerClass = level === 1 ? "text-lg font-bold" : 
                         level === 2 ? "text-base font-semibold" : "text-sm font-medium";
      return (
        <div key={lineIndex} className={`${headerClass} mt-2 mb-1`}>
          {formatInlineMarkdown(text)}
        </div>
      );
    }
    
    return (
      <span key={lineIndex}>
        {formatInlineMarkdown(line)}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

function formatInlineMarkdown(text: string) {
  // Convert markdown formatting to JSX
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~)/);
  
  return parts.map((part, partIndex) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
    } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      // Italic text
      return <em key={partIndex}>{part.slice(1, -1)}</em>;
    } else if (part.startsWith('`') && part.endsWith('`')) {
      // Code text
      return <code key={partIndex} className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded text-xs">{part.slice(1, -1)}</code>;
    } else if (part.startsWith('~~') && part.endsWith('~~')) {
      // Strikethrough text
      return <del key={partIndex}>{part.slice(2, -2)}</del>;
    } else {
      // Regular text
      return part;
    }
  });
}

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
                  <div className="whitespace-pre-wrap">
                    {m.role === "assistant" ? formatMessage(m.content) : m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  value={input} 
                  onChange={e=>setInput(e.target.value)} 
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 outline-none"
                  onKeyDown={e => e.key === "Enter" && send()}
                />
                <button 
                  onClick={send} 
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shrink-0"
                  title="Send message"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Press <kbd className="px-1 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-xs">Enter</kbd> to send
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}