"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const DEMO_LETTER =
  "Hi Stripe team,\n\nI've spent the last four years building payments infrastructure at scale — most recently a webhooks system handling 40M events a day with p99 under 80ms. Your Infra team's work on idempotency keys was required reading on my team, and I'd love to contribute to what comes next.\n\nBrief highlights:\n• Rebuilt our retry layer, cut dead-letter volume 62%\n• Led migration off Aurora to a sharded setup, ~$1.1M saved\n• Open-sourced a small Go library for distributed rate limiting\n\nWould love 20 minutes to talk.";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [letterText, setLetterText] = useState("");
  const [typing, setTyping] = useState(true);
  const letterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (letterRef.current >= DEMO_LETTER.length) {
        setTyping(false);
        clearInterval(interval);
        return;
      }
      setLetterText(DEMO_LETTER.slice(0, letterRef.current + 1));
      letterRef.current += 1;
    }, 12);
    return () => clearInterval(interval);
  }, []);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-500" />
          ApplyBot
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-violet-100 via-violet-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-700">
            Career
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            One form. Thousand applications.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Fill out your profile once. Our AI finds and applies to every job that fits, with
            tailored cover letters included.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-violet-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                Job URL
              </div>
              <div className="mt-2 rounded-xl bg-neutral-50 px-4 py-3 font-mono text-sm text-neutral-700">
                stripe.com/jobs/listing/software-engineer-infrastructure/6124732
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600">
                <span>Cover letter — tailored</span>
                {typing && (
                  <span className="text-neutral-400 normal-case tracking-normal font-normal">
                    writing…
                  </span>
                )}
              </div>
              <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-neutral-800 min-h-[140px]">
                {letterText}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">🤖</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Auto-fills every application
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Ashby, Greenhouse, Lever, Workday, Taleo. Submitted while you sleep.
              </p>
            </div>
            <div>
              <div className="text-3xl">✍️</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Personalized cover letters
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Tailored to the job, the company, and your unique background.
              </p>
            </div>
            <div>
              <div className="text-3xl">📊</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Response tracking</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                See which applications got replies. Focus your follow-ups where they matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Tell us your target</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                The role, the company, the seniority. We calibrate everything to that.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Upload your profile once</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Resume, skills, preferences. We handle every field on every form after that.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Watch applications fly</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                We apply round the clock. You track responses and focus on interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-violet-600 px-7 py-3.5 font-medium text-white transition hover:bg-violet-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-500" />
            ApplyBot
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
