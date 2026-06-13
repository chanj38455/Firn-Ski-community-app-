"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { communityCategories } from "@/data/resorts";

type Props = {
  resort: string;
  defaultCategory?: string;
};

export default function NewPostModal({ resort, defaultCategory }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(defaultCategory ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!title.trim() || !body.trim() || !category) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category, resort }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to post");
      }
      setOpen(false);
      setTitle("");
      setBody("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    return (
      <a
        href="/signin"
        className="inline-flex items-center justify-center h-8 gap-1.5 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition-colors"
      >
        Sign in to post
      </a>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex items-center gap-2 h-8 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> New Post
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create a Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-300">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {communityCategories.map((c) => (
                <SelectItem key={c.slug} value={c.slug} className="text-slate-300 hover:text-white">
                  {c.icon} {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
          />

          <Textarea
            className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 min-h-[120px] resize-none focus:ring-sky-500"
            placeholder="What's on your mind? Share details, requirements, or questions..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-500 text-white"
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
