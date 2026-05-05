"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Send, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

type Thread = {
  id: string;
  project_name: string;
  last_message: string;
  updated_at: string;
};

type Message = {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
};

export default function MensagensPage() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selected, setSelected] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("message_threads")
          .select("*")
          .eq("client_id", user.id)
          .order("updated_at", { ascending: false });
        setThreads(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const load = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("thread_id", selected.id)
        .order("created_at");
      setMessages(data || []);
    };
    load();

    const sub = supabase
      .channel(`thread:${selected.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `thread_id=eq.${selected.id}` },
        (payload) => setMessages((prev) => [...prev, payload.new as Message])
      )
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!draft.trim() || !selected || !user) return;
    const content = draft.trim();
    setDraft("");
    await supabase.from("messages").insert({
      thread_id: selected.id,
      sender_id: user.id,
      sender_name: user.user_metadata?.name || user.email,
      content,
    });
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">{t("common.loading")}</div>;

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-4">
      {/* Thread list */}
      <div className="w-72 shrink-0 bg-white rounded-2xl border border-gray-100 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <h1 className="font-semibold text-gray-900">{t("portal.client.messages")}</h1>
        </div>
        {threads.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">
            <MessageSquare size={32} className="mx-auto mb-3 text-gray-300" />
            {t("portal.client.no_messages")}
          </div>
        ) : (
          threads.map((th) => (
            <button
              key={th.id}
              onClick={() => setSelected(th)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors",
                selected?.id === th.id && "bg-blue-50"
              )}
            >
              <p className="font-medium text-sm text-gray-900">{th.project_name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{th.last_message}</p>
            </button>
          ))
        )}
      </div>

      {/* Chat */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
              <p>Selecione uma conversa</p>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-900">
              {selected.project_name}
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isOwn = msg.sender_id === user?.id;
                return (
                  <div key={msg.id} className={cn("flex", isOwn && "justify-end")}>
                    <div className={cn(
                      "max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm",
                      isOwn
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    )}>
                      {!isOwn && <p className="text-xs font-semibold mb-1 opacity-60">{msg.sender_name}</p>}
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Escreva uma mensagem..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
