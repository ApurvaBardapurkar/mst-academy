import type { Metadata } from "next";
import Link from "next/link";
import { getCurriculum } from "@/lib/curriculum";
import { Typewriter } from "@/components/marketing/Typewriter";
import {
  BookOpen,
  Clock,
  Shield,
  Zap,
  Layers,
  Rocket,
  Crown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academy Overview — Masterstroke Blockchain Curriculum",
  description:
    "Learn the complete MST Academy course: 4 phases, 21 modules, 122 lessons, and full-screen assessments. Get a clear plan and estimated hours before you start.",
};

export default function AcademyOverviewPage() {
  const curriculum = getCurriculum();
  const phasesCount = curriculum.phases.length;
  const modulesCount = curriculum.modules.length;
  const lessonsCount = curriculum.modules.reduce(
    (sum, m) => sum + m.submodules.length,
    0
  );
  const estimatedHours = (lessonsCount * 12) / 60;

  const phases = [
    {
      title: "Blockchain Foundations",
      icon: BookOpen,
      desc: "Cryptography, consensus, wallets, and blockchain architecture.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Smart Contracts & Solidity",
      icon: Shield,
      desc: "Solidity programming, contract patterns, security, and testing.",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "DeFi & Advanced Protocols",
      icon: Layers,
      desc: "AMMs, lending, oracles, and real-world decentralized applications.",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      title: "Capstone & Deployment",
      icon: Rocket,
      desc: "Build and deploy production-grade dApps with governance and tokenomics.",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const learningPoints = [
    "Understand Web3 from fundamentals to production patterns",
    "Learn Solidity, secure smart contract design, and practical testing",
    "Build DeFi components: lending, AMMs, and oracle-driven logic",
    "Master NFTs and decentralised application architecture",
    "Complete full-screen assessments to unlock the next topics",
    "Track progress on your dashboard with clear analytics",
  ];

  return (
    <div className="overflow-hidden bg-[var(--bg)]">
      {/* Hero */}
      <section className="relative bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(227,30,36,0.08)] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mst-red">
              MST Blockchain Academy
            </p>

            <h1 className="mt-8 text-4xl font-black leading-[1.1] tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              Master Blockchain Development{" "}
              <Typewriter
                strings={[
                  "From Zero to Production",
                  "Learn • Build • Deploy",
                  "Complete the Full Curriculum",
                ]}
                speedMs={42}
                pauseMs={900}
                className="text-gradient-red"
              />
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              A structured 4-phase program with expandable learning paths,
              voice-friendly lessons, and full-screen assessments.
              <span className="block mt-2 font-semibold text-[var(--text)]">
                Estimated time: ~{estimatedHours.toFixed(1)} hours
              </span>
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/learn"
                className="group inline-flex items-center gap-2 rounded-full bg-mst-red px-8 py-3.5 font-semibold text-white shadow-lg shadow-mst-red/20 transition-all hover:bg-mst-red-dark hover:shadow-xl hover:shadow-mst-red/30"
              >
                Start Learning
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-8 py-3.5 font-semibold text-[var(--text)] transition-all hover:border-mst-red hover:bg-[var(--bg-muted)]"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {[
              { value: phasesCount, label: "Phases" },
              { value: modulesCount, label: "Modules" },
              { value: `${lessonsCount}+`, label: "Lessons" },
              { value: `${estimatedHours.toFixed(1)}`, label: "Hours (est.)" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center shadow-sm"
              >
                <p className="text-3xl font-black text-mst-red sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you’ll learn */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mst-red">
              What you will learn
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Skills you can use immediately
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">
              Clear outcomes per module with structured sub-modules, voice
              reading, and assessment-based progression.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningPoints.map((t) => (
              <div
                key={t}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-mst-red/10">
                    <CheckCircle2 className="h-5 w-5 text-mst-red" />
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] group-hover:text-[var(--text)]">
                    {t}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mst-red">
              How the academy works
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              A complete path from lesson to dashboard
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Explore the Learning Tree",
                icon: Zap,
                body: "Expand phases → modules → sub-modules. Progress badges show what is unlocked.",
              },
              {
                title: "Read with voice + TOC",
                icon: Clock,
                body: "Use the “On this page” TOC to jump to sections. Listen to the lesson if needed.",
              },
              {
                title: "Pass full-screen assessments",
                icon: Shield,
                body: "Lockdown assessments with anti-cheat protections and immediate results.",
              },
              {
                title: "Track progress on your dashboard",
                icon: Crown,
                body: "See completion, scores, streaks, and areas of improvement.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mst-red/10">
                    <s.icon className="h-5 w-5 text-mst-red" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text)]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course structure */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mst-red">
              Course structure
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Four phases. One complete journey.
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">
              Each phase builds on the previous one with clear sub-module
              progression and assessments.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {phases.map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:border-[var(--border-strong)] hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r ${p.gradient}`}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mst-red/10">
                      <p.icon className="h-5 w-5 text-mst-red" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text)]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mst-red to-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-mst-red/20 transition hover:shadow-mst-red/40"
            >
              Open Learning Tree
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-8 py-3.5 text-sm font-bold text-[var(--text)] transition hover:border-mst-red hover:bg-[var(--bg-muted)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

