import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listLeads } from "@/functions/leads.functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads · ESI Wellness (Admin)" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LeadsAdmin,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  concern: string | null;
  source: string | null;
  created_at: string;
};

function LeadsAdmin() {
  const list = useServerFn(listLeads);
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function load() {
    if (!token) return toast.error("Enter access token");
    setLoading(true);
    try {
      const res = await list({ data: { token } });
      if (!res.ok) {
        toast.error(res.error);
        setLeads(null);
      } else {
        setLeads(res.leads as Lead[]);
        toast.success(`Loaded ${res.leads.length} leads`);
      }
    } catch {
      toast.error("Could not load leads");
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!leads || leads.length === 0) return;
    const head = ["Date", "Name", "Email", "Phone", "Concern", "Source"];
    const rows = leads.map((l) => [
      new Date(l.created_at).toISOString(),
      l.name,
      l.email,
      l.phone,
      l.concern ?? "",
      l.source ?? "",
    ]);
    const csv = [head, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = (leads ?? []).filter((l) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      (l.concern ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-paper text-ink p-4 sm:p-8">
      <Toaster richColors position="top-center" theme="light" />
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-ink">Leads</h1>
            <p className="text-sm text-ink-muted">
              ESI Wellness Alpha Men — internal admin view.
            </p>
          </div>
          {leads && (
            <button
              onClick={exportCsv}
              className="rounded-md border border-rule px-4 py-2 text-sm font-medium hover:bg-card"
            >
              Export CSV
            </button>
          )}
        </header>

        {!leads && (
          <div className="mx-auto max-w-md rounded-2xl border border-rule bg-card p-6">
            <label className="text-sm font-medium text-ink">Access token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load()}
              placeholder="Enter LEADS_ADMIN_TOKEN"
              className="mt-2 w-full rounded-md border border-rule bg-paper px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
              autoFocus
            />
            <button
              onClick={load}
              disabled={loading}
              className="mt-4 w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:bg-brand/90 disabled:opacity-60"
            >
              {loading ? "Loading…" : "Unlock Leads"}
            </button>
            <p className="mt-3 text-xs text-ink-muted">
              This page is private. Token is checked on the server.
            </p>
          </div>
        )}

        {leads && (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, phone, concern…"
                className="w-full sm:max-w-sm rounded-md border border-rule bg-paper px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
              />
              <div className="text-sm text-ink-muted">
                {filtered.length} of {leads.length} leads
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-rule bg-card">
              <table className="w-full text-sm">
                <thead className="bg-brand/10 text-ink">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Concern</th>
                    <th className="px-4 py-3 text-left font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-t border-rule">
                      <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                        {new Date(l.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-ink">{l.name}</td>
                      <td className="px-4 py-3 text-ink">
                        <a href={`tel:${l.phone}`} className="hover:text-brand">
                          {l.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">
                        <a href={`mailto:${l.email}`} className="hover:text-brand">
                          {l.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-ink-muted">{l.concern ?? "—"}</td>
                      <td className="px-4 py-3 text-ink-muted">{l.source ?? "—"}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">
                        No leads match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
