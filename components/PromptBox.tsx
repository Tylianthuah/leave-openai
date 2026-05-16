"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { HelpCircle, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "assistant";

  content: string;
};

export default function PromptBox() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  async function handleSubmit() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      // USER MESSAGE
      const updatedMessages = [
        ...messages,

        {
          role: "user" as const,

          content: prompt,
        },
      ];

      setMessages(updatedMessages);

      const res = await fetch("/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      // ASSISTANT MESSAGE
      setMessages([
        ...updatedMessages,

        {
          role: "assistant",

          content: data.message || "No response",
        },
      ]);

      setPrompt("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border bg-background/80 backdrop-blur shadow-xl p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
            <HelpCircle />
          </div>

          <div>
            <h2 className="font-semibold text-lg">Your Leave Assistant</h2>

            <p className="text-sm text-muted-foreground">
              Ask anything about leave requests
            </p>
          </div>
        </div>

        {/* CHAT */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 text-sm leading-7 whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                  : "bg-muted max-w-[80%]"
              }`}
            >
              {message.content}
            </div>
          ))}

          {loading && (
            <div className="rounded-2xl bg-muted p-4 text-sm flex items-center gap-2 w-fit">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="space-y-3">
          <Textarea
            placeholder="Ask anything about leave requests..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-30 resize-none rounded-2xl border-0 bg-muted/60 focus-visible:ring-1 text-base"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-xl px-6"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
