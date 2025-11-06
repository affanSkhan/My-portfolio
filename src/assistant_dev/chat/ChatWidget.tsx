"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Lock, Globe } from "lucide-react";

type Mode = "public" | "private";

// Simple markdown-to-JSX converter for basic formatting
function formatMessage(content: string | undefined | null) {
  // Handle undefined or null content
  if (!content) {
    return "Loading...";
  }
  
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

function formatInlineMarkdown(text: string | undefined | null) {
  // Handle undefined or null text
  if (!text) {
    return "";
  }
  
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
      return <code key={partIndex} className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded text-xs text-zinc-600 dark:text-gray-300">{part.slice(1, -1)}</code>;
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
    { role: "assistant", content: "Hello 👋 I'm Affonix, the intelligence behind Affan's digital portfolio. I can tell you about his projects, skills, and journey." }
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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ mode, pinOk, messages: [...messages, { role:"user", content:text }] })
      });
      const data = await res.json();
      
      // Handle API errors or missing reply
      const replyContent = data.reply || data.error || "Sorry, something went wrong. Please try again.";
      setMessages(m => [...m, { role:"assistant", content: replyContent }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(m => [...m, { role:"assistant", content: "Sorry, I'm having trouble connecting. Please check your internet connection and try again." }]);
    }
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
      setMessages(m => [...m, { role:"assistant", content: "🧠 Developer Mode Activated — Affonix is ready to edit, update, or deploy your portfolio." }]);
    } else {
      alert("Wrong PIN");
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(v=>!v)}
        className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-xl transition-all duration-300 group ${
          mode === "private" && pinOk 
            ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-indigo-500/50 shadow-2xl animate-pulse" 
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-110 hover:shadow-indigo-500/25 hover:shadow-2xl"
        }`}
        aria-label={mode === "private" && pinOk ? "Affonix Admin Mode" : "Ask about Affan's projects, goals, or experience"}
        title={mode === "private" && pinOk ? "Affonix Admin Mode" : "Ask about Affan's projects, goals, or experience"}
      >
        {open ? <X /> : mode === "private" && pinOk ? "🧠" : <MessageCircle className="group-hover:animate-bounce" />}
      </button>

      {/* Hover Tooltip for Public Mode */}
      {mode === "public" && !open && (
        <div className="fixed bottom-6 right-20 z-[59] px-3 py-2 bg-zinc-900 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          <div className="flex items-center gap-2">
            <span>💫</span>
            <span>Ask <span className="font-bold bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">AFFONIX</span> about Affan</span>
          </div>
          <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-zinc-900 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
        </div>
      )}

      {/* Admin Mode Indicator */}
      {mode === "private" && pinOk && (
        <div className="fixed bottom-20 right-4 z-[59] flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs rounded-full shadow-lg animate-pulse">
          <span className="text-sm">💫</span>
          <span className="font-medium">Admin Active</span>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
            className={`fixed bottom-20 right-6 z-[60] w-[92vw] max-w-md rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300 ${
              mode === "private" && pinOk 
                ? "border border-indigo-300 dark:border-blue-600/50 bg-white/95 dark:bg-zinc-900/95 shadow-indigo-500/20 shadow-2xl"
                : "border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90"
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800 ${mode === "private" && pinOk ? "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50" : ""}`}>
              <div className="text-sm">
                <div className={`font-bold tracking-wide ${mode === "private" && pinOk ? "bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent" : "bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent"}`}>
                  {mode === "private" && pinOk ? "AFFONIX [ADMIN]" : "AFFONIX"}
                </div>
                <div className={`text-xs flex items-center gap-1 ${mode === "private" && pinOk ? "text-indigo-600 dark:text-blue-400 font-medium" : "text-zinc-500"}`}>
                  <span>{mode === "private" && pinOk ? "Active Intelligence" : "Digital Portfolio Intelligence"}</span>
                  {mode === "public" && (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-sky-400 rounded-full animate-pulse opacity-70"></div>
                      <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`text-xs px-2 py-1 rounded transition-all ${
                    mode==="public"
                      ? "bg-zinc-200 dark:bg-zinc-800"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                  onClick={()=>{ setMode("public"); setPinOk(false); }}
                  title="Public Mode"
                ><Globe className="inline w-3.5 h-3.5 mr-1"/>Public</button>

                <button
                  className={`text-xs px-2 py-1 rounded transition-all ${
                    mode==="private" && pinOk
                      ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm"
                      : mode==="private"
                      ? "bg-zinc-200 dark:bg-zinc-800"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                  onClick={()=> pinOk ? setMode("private") : tryLogin()}
                  title="Private Mode"
                >
                  {mode === "private" && pinOk ? "🧠" : <Lock className="inline w-3.5 h-3.5 mr-1"/>}
                  {mode === "private" && pinOk ? "Admin" : "Private"}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => {
                const isAssistant = m.role === "assistant";
                const isPrivateMode = mode === "private" && pinOk;
                
                return (
                  <div key={i} className={`text-sm ${
                    isAssistant 
                      ? isPrivateMode 
                        ? "bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 !text-indigo-800 dark:!text-blue-300 border border-indigo-200 dark:border-blue-800/50"
                        : "bg-zinc-100 dark:bg-zinc-800 !text-zinc-700 dark:!text-gray-300"
                      : "bg-indigo-50 dark:bg-indigo-900/30 !text-zinc-900 dark:!text-white"
                  } p-3 rounded-lg`}>
                    <div className="whitespace-pre-wrap">
                      {isAssistant ? formatMessage(m.content) : (m.content || "Loading...")}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  value={input} 
                  onChange={e=>setInput(e.target.value)} 
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-gray-300 placeholder:text-zinc-500 dark:placeholder:text-gray-400 outline-none"
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