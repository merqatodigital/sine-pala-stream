import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteFilm, emptyFilmRow, listFilms, upsertFilm, type FilmRow } from "@/lib/films-db";
import { Wordmark } from "@/components/likha/nav";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Likha Flix" }] }),
  component: AdminPage,
});

const TIERS = ["premiere", "feature", "catalog", "short", "free"] as const;
const CATEGORIES = ["full-length", "short"] as const;

function AdminPage() {
  const queryClient = useQueryClient();
  const { data: films, isLoading, isError, error } = useQuery({
    queryKey: ["admin-films"],
    queryFn: listFilms,
  });

  const [editing, setEditing] = useState<FilmRow | null>(null);
  const [isNew, setIsNew] = useState(false);

  const saveMutation = useMutation({
    mutationFn: (film: FilmRow) => upsertFilm(film, isNew),
    onSuccess: () => {
      toast.success(isNew ? "Film created" : "Film updated");
      queryClient.invalidateQueries({ queryKey: ["admin-films"] });
      setEditing(null);
    },
    onError: (err: Error) => toast.error(`Save failed: ${err.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFilm(id),
    onSuccess: () => {
      toast.success("Film deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-films"] });
    },
    onError: (err: Error) => toast.error(`Delete failed: ${err.message}`),
  });

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Wordmark className="text-lg" />
          <h1 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Admin
          </h1>
        </div>

        <div className="mt-6 rounded-md border border-festival/40 bg-festival/10 px-4 py-3 text-sm text-foreground">
          <strong className="font-semibold">No login is required to reach this page.</strong>{" "}
          Anyone with this URL can add, edit, or delete films. Add authentication before sharing
          this link outside the team.
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-foreground">Films</h2>
          <Button
            onClick={() => {
              setIsNew(true);
              setEditing({ ...emptyFilmRow });
            }}
          >
            <Plus className="size-4" />
            New Film
          </Button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Poster</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    Loading films…
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-destructive">
                    Couldn't load films — {(error as Error)?.message ?? "unknown error"}.
                    <br />
                    Have you run the `films` table SQL in Supabase yet?
                  </TableCell>
                </TableRow>
              ) : films && films.length > 0 ? (
                films.map((film) => (
                  <TableRow key={film.id}>
                    <TableCell>
                      {film.poster ? (
                        <img
                          src={film.poster}
                          alt=""
                          className="h-14 w-10 rounded object-cover"
                        />
                      ) : null}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{film.title}</TableCell>
                    <TableCell className="text-muted-foreground">{film.director}</TableCell>
                    <TableCell className="text-muted-foreground">{film.year}</TableCell>
                    <TableCell className="text-muted-foreground">{film.category}</TableCell>
                    <TableCell className="text-muted-foreground">₱{film.price}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsNew(false);
                          setEditing(film);
                        }}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Delete "${film.title}"? This can't be undone.`)) {
                            deleteMutation.mutate(film.id);
                          }
                        }}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No films yet. Click "New Film" to add one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
          {editing ? (
            <FilmForm
              film={editing}
              isNew={isNew}
              saving={saveMutation.isPending}
              onCancel={() => setEditing(null)}
              onSave={(film) => saveMutation.mutate(film)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilmForm({
  film,
  isNew,
  saving,
  onCancel,
  onSave,
}: {
  film: FilmRow;
  isNew: boolean;
  saving: boolean;
  onCancel: () => void;
  onSave: (film: FilmRow) => void;
}) {
  const [form, setForm] = useState<FilmRow>(film);
  const set = <K extends keyof FilmRow>(key: K, value: FilmRow[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.id.trim() || !form.title.trim() || !form.director.trim()) {
      toast.error("Slug, title, and director are required");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{isNew ? "New Film" : `Edit "${film.title}"`}</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4 sm:grid-cols-2">
        <Field label="Slug (id)">
          <Input
            value={form.id}
            disabled={!isNew}
            onChange={(e) => set("id", e.target.value)}
            placeholder="a-ni-mal"
            required
          />
        </Field>
        <Field label="Title">
          <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>
        <Field label="Director">
          <Input
            value={form.director}
            onChange={(e) => set("director", e.target.value)}
            required
          />
        </Field>
        <Field label="Year">
          <Input
            type="number"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
          />
        </Field>
        <Field label="Runtime">
          <Input
            value={form.runtime ?? ""}
            onChange={(e) => set("runtime", e.target.value)}
            placeholder="90m"
          />
        </Field>
        <Field label="Genre">
          <Input value={form.genre ?? ""} onChange={(e) => set("genre", e.target.value)} />
        </Field>
        <Field label="Region">
          <Input value={form.region ?? ""} onChange={(e) => set("region", e.target.value)} />
        </Field>
        <Field label="Rating">
          <Input
            value={form.rating ?? ""}
            onChange={(e) => set("rating", e.target.value)}
            placeholder="PG-13"
          />
        </Field>
        <Field label="Price (₱)">
          <Input
            type="number"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </Field>
        <Field label="Tier">
          <Select value={form.tier} onValueChange={(v) => set("tier", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIERS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Category">
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Award (optional)">
          <Input value={form.award ?? ""} onChange={(e) => set("award", e.target.value)} />
        </Field>
        <Field label="Poster image URL">
          <Input value={form.poster ?? ""} onChange={(e) => set("poster", e.target.value)} />
        </Field>
        <Field label="Still / backdrop image URL">
          <Input value={form.still ?? ""} onChange={(e) => set("still", e.target.value)} />
        </Field>
        <Field label="YouTube trailer ID">
          <Input
            value={form.trailer_youtube_id ?? ""}
            onChange={(e) => set("trailer_youtube_id", e.target.value)}
            placeholder="zv67ZBHjky0"
          />
        </Field>
        <Field label="Source URL">
          <Input
            value={form.source_url ?? ""}
            onChange={(e) => set("source_url", e.target.value)}
          />
        </Field>
        <Field label="Synopsis" full>
          <Textarea
            rows={4}
            value={form.synopsis ?? ""}
            onChange={(e) => set("synopsis", e.target.value)}
          />
        </Field>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </DialogFooter>
    </form>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
