import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { TopNav, MobileTabBar } from "@/components/likha/nav";
import { Footer } from "@/components/likha/footer";
import { FilmDetail } from "@/components/likha/film-detail";
import { SearchOverlay } from "@/components/likha/search-overlay";
import { MyListPanel } from "@/components/likha/my-list-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { shell } from "@/components/likha/layout";
import type { Film } from "@/data/films";

const CONTACT_EMAIL = "hello@likhaflix.com";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Likha Flix" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState<Film | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Fill in your name, email, and message first");
      return;
    }
    const subject = encodeURIComponent(`Likha Flix contact form — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app…");
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <TopNav onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <main className={`${shell} py-16 lg:py-24`}>
        <div className="mx-auto max-w-md">
          <h1 className="font-display text-3xl font-semibold text-foreground">Contact</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Questions, film submissions, or partnership ideas — send us a note.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                className="mt-1.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                className="mt-1.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                rows={5}
                className="mt-1.5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              This opens your email app addressed to {CONTACT_EMAIL} — there's no backend inbox
              wired up yet.
            </p>
          </form>
        </div>
      </main>

      <Footer />
      <MobileTabBar onSearch={() => setSearchOpen(true)} onOpenMyList={() => setMyListOpen(true)} />
      <FilmDetail film={selected} onClose={() => setSelected(null)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onOpenFilm={setSelected} />
      <MyListPanel open={myListOpen} onClose={() => setMyListOpen(false)} onOpenFilm={setSelected} />
    </div>
  );
}
