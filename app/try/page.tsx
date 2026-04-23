"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "pending" | "interview" | "rejected";

interface ApplicationResult {
  company: string;
  role: string;
  status: Status;
}

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-amber-100 text-amber-700",
  interview: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<Status, string> = {
  pending: "Pending",
  interview: "Interview",
  rejected: "Rejected",
};

const MOCK_RESULTS: ApplicationResult[] = [
  { company: "Meridian AI", role: "Software Engineer", status: "interview" },
  { company: "Vortex Systems", role: "Software Engineer", status: "pending" },
  { company: "Luminary Labs", role: "Software Engineer", status: "rejected" },
];

type Step = "form" | "results";

export default function TryPage() {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);

  function updateSkill(index: number, value: string) {
    setSkills((prev) => prev.map((s, i) => (i === index ? value : s)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Post to waitlist API with email
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal
    }
    // Simulate a short delay for effect
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setStep("results");
  }

  if (step === "results") {
    return (
      <div className="min-h-screen bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-500" />
            ApplyBot
          </Link>
        </nav>

        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="mb-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
            Applied
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">
            Applied to 3 companies
          </h1>
          <p className="mt-2 text-neutral-600">
            We submitted your profile with a tailored cover letter to each opening. Here&apos;s the
            live status:
          </p>

          <div className="mt-8 divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white shadow-sm">
            {MOCK_RESULTS.map((app) => (
              <div
                key={app.company}
                className="flex items-center justify-between px-5 py-4"
              >
                <div>
                  <p className="font-semibold text-neutral-900">{app.company}</p>
                  <p className="text-sm text-neutral-500">{app.role}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[app.status]}`}
                >
                  {STATUS_LABELS[app.status]}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-neutral-400">
            This is a v0 mock — real AI application submission coming soon.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => setStep("form")}
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition hover:border-neutral-900"
            >
              Try again
            </button>
            <Link
              href="/#waitlist"
              className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-500" />
          ApplyBot
        </Link>
      </nav>

      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="mb-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
          Try it
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">
          Fill out your profile once.
        </h1>
        <p className="mt-2 text-neutral-600">
          We&apos;ll apply to 3 matching companies with a tailored cover letter for each.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Top 3 skills
            </label>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <input
                  key={i}
                  type="text"
                  required
                  value={skill}
                  onChange={(e) => updateSkill(i, e.target.value)}
                  placeholder={
                    i === 0 ? "e.g. TypeScript" : i === 1 ? "e.g. System design" : "e.g. React"
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-neutral-900 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
          >
            {submitting ? "Applying…" : "Apply to 3 companies →"}
          </button>
        </form>

        <p className="mt-4 text-xs text-neutral-400">
          This is a v0 mock — no real applications are submitted.
        </p>
      </div>
    </div>
  );
}
