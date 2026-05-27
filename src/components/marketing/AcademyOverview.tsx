"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Curriculum, ModuleMeta, Phase } from "@/lib/types";
import { getCardSubmoduleTitle } from "@/lib/display-titles";
import {
  ASSESSMENT_TYPES,
  OUTCOMES,
  PHASE_HOURS,
  PROGRAMME_BADGES,
  PROGRAMME_STATS,
} from "@/lib/academy-overview";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Shield,
  Star,
  Target,
  Zap,
} from "lucide-react";

interface AcademyOverviewProps {
  curriculum: Curriculum;
}

const OUTCOME_ICONS = {
  code: Code2,
  star: Star,
  shield: Shield,
  globe: Globe,
} as const;

function StatCard({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 text-center transition hover:-translate-y-0.5 ${
        accent
          ? "border-mst-red/30 bg-mst-red/5"
          : "border-[var(--border)] bg-[var(--surface)]"
      }`}
    >
      <div
        className={`text-3xl font-black tracking-tight sm:text-4xl ${
          accent ? "text-gradient-red" : "text-[var(--text)]"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </div>
    </div>
  );
}

function Expandable({
  open,
  onToggle,
  header,
  children,
  accent,
}: {
  open: boolean;
  onToggle: () => void;
  header: React.ReactNode;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--border-strong)]"
      style={accent ? { borderLeftWidth: 4, borderLeftColor: accent } : undefined}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[var(--bg-muted)]"
      >
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--text-muted)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
        <div className="min-w-0 flex-1">{header}</div>
      </button>
      {open && (
        <div className="border-t border-[var(--border)] px-5 py-4">{children}</div>
      )}
    </div>
  );
}

const PHASE_COLORS = [
  "var(--accent-blue)",
  "var(--mst-red)",
  "var(--accent-purple)",
  "var(--accent-green)",
];

function PhaseSection({
  phase,
  modules,
  index,
}: {
  phase: Phase;
  modules: ModuleMeta[];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const [openModules, setOpenModules] = useState<Set<number>>(new Set());
  const meta = PHASE_HOURS[phase.id];
  const subCount = modules.reduce((n, m) => n + m.submodules.length, 0);
  const color = PHASE_COLORS[index] ?? "var(--mst-red)";

  const toggleModule = (id: number) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Expandable
      open={open}
      onToggle={() => setOpen((v) => !v)}
      accent={color}
      header={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Phase {index + 1}
            </p>
            <h3 className="text-lg font-bold text-[var(--text)]">{phase.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-[var(--text-muted)]">
              {modules.length} modules
            </span>
            <span className="rounded-full bg-[var(--bg-muted)] px-3 py-1 text-[var(--text-muted)]">
              {subCount} submodules
            </span>
            {meta && (
              <span className="rounded-full bg-mst-red/10 px-3 py-1 text-mst-red">
                ~{meta.hours} hrs
              </span>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        {modules.map((mod) => (
          <Expandable
            key={mod.id}
            open={openModules.has(mod.id)}
            onToggle={() => toggleModule(mod.id)}
            header={
              <div>
                <p className="text-xs font-bold text-mst-red">
                  Module {String(mod.id).padStart(2, "0")}
                </p>
                <p className="font-semibold text-[var(--text)]">{mod.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">
                  {mod.description}
                </p>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    <th className="pb-2 pr-4 font-semibold">#</th>
                    <th className="pb-2 pr-4 font-semibold">Submodule</th>
                    <th className="pb-2 font-semibold">Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.submodules.map((sub) => (
                    <tr
                      key={sub.slug}
                      className="border-b border-[var(--border)]/60 last:border-0"
                    >
                      <td className="py-2.5 pr-4 font-mono text-xs text-mst-red">
                        {sub.id}
                      </td>
                      <td className="py-2.5 pr-4 font-medium text-[var(--text)]">
                        {getCardSubmoduleTitle(sub.title)}
                      </td>
                      <td className="py-2.5 text-[var(--text-muted)]">
                        {sub.subtitle?.trim() ? (
                          <span className="line-clamp-3">{sub.subtitle}</span>
                        ) : (
                          <span className="italic opacity-60">
                            Focus lesson on {getCardSubmoduleTitle(sub.title)}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Expandable>
        ))}
      </div>
    </Expandable>
  );
}

export function AcademyOverview({ curriculum }: AcademyOverviewProps) {
  const moduleMap = useMemo(() => {
    const map = new Map<number, ModuleMeta>();
    for (const m of curriculum.modules) map.set(m.id, m);
    return map;
  }, [curriculum.modules]);

  const phasesWithModules = useMemo(
    () =>
      curriculum.phases.map((phase) => ({
        phase,
        modules: phase.modules
          .map((id) => moduleMap.get(id))
          .filter((m): m is ModuleMeta => m != null),
      })),
    [curriculum.phases, moduleMap]
  );

  const totalSubmodules = curriculum.modules.reduce(
    (n, m) => n + m.submodules.length,
    0
  );

  return (
    <div className="overflow-hidden bg-[var(--bg)]">
      {/* Hero */}
      <section className="bg-grid relative border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mst-red">
              <GraduationCap className="h-3.5 w-3.5" />
              Programme Overview
            </p>
            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-[var(--text)] sm:text-5xl">
              MST Blockchain Academy{" "}
              <span className="text-gradient-red">Full Curriculum</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              A structured, college-integrated programme — from internet
              fundamentals to capstone deployment, security audits, and Demo Day.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={String(PROGRAMME_STATS.phases)} label="Phases" accent />
            <StatCard value={String(PROGRAMME_STATS.modules)} label="Modules" />
            <StatCard value={`${totalSubmodules}+`} label="Submodules" />
            <StatCard value={`${PROGRAMME_STATS.hours}+`} label="Hours" accent />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {PROGRAMME_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-mst-red px-8 py-3.5 font-semibold text-white shadow-lg shadow-mst-red/20 transition hover:bg-mst-red-dark"
            >
              Enroll Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-8 py-3.5 font-semibold text-[var(--text)] transition hover:border-mst-red"
            >
              <BookOpen className="h-4 w-4" />
              Open Learning Tree
            </Link>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="border-b border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-[var(--text)] sm:text-4xl">
              What You Will Achieve
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--text-muted)]">
              Graduate with production skills, a portfolio project, and a path to
              grants and on-chain credentials.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => {
              const Icon = OUTCOME_ICONS[o.icon as keyof typeof OUTCOME_ICONS];
              return (
                <div
                  key={o.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-mst-red/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mst-red/10 text-mst-red">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[var(--text)]">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {o.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-[var(--text)] sm:text-4xl">
                Curriculum by Phase
              </h2>
              <p className="mt-3 max-w-xl text-[var(--text-muted)]">
                Expand each phase to browse modules and every submodule with its
                learning focus.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-muted)]">
              <Clock className="h-4 w-4 text-mst-red" />
              {PROGRAMME_STATS.hours}+ total hours
            </div>
          </div>
          <div className="space-y-4">
            {phasesWithModules.map(({ phase, modules }, i) => (
              <PhaseSection key={phase.id} phase={phase} modules={modules} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Module directory */}
      <section id="modules" className="border-b border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-black text-[var(--text)] sm:text-4xl">
            Module Directory
          </h2>
          <p className="mt-3 text-[var(--text-muted)]">
            All {PROGRAMME_STATS.modules} modules at a glance.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[var(--surface)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Module</th>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Phase</th>
                  <th className="px-5 py-3 font-semibold">Submodules</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.modules.map((mod, i) => {
                  const phaseIdx = curriculum.phases.findIndex((p) =>
                    p.modules.includes(mod.id)
                  );
                  return (
                    <tr
                      key={mod.id}
                      className={`border-t border-[var(--border)] ${
                        i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--surface)]/50"
                      }`}
                    >
                      <td className="px-5 py-3 font-mono font-bold text-mst-red">
                        {String(mod.id).padStart(2, "0")}
                      </td>
                      <td className="px-5 py-3 font-medium text-[var(--text)]">
                        {mod.title}
                      </td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">
                        Phase {phaseIdx + 1}
                      </td>
                      <td className="px-5 py-3 text-[var(--text-muted)]">
                        {mod.submodules.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section id="assessment" className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-[var(--text)] sm:text-4xl">
                Assessment Framework
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
                Every submodule includes rigorous assessments. You must score at
                least{" "}
                <strong className="text-[var(--text)]">
                  {PROGRAMME_STATS.passThreshold}%
                </strong>{" "}
                to unlock the next lesson. Full-screen lockdown mode ensures
                integrity.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Submodule quizzes after each lesson",
                  "Module-end comprehensive tests",
                  "Coding challenges with testnet deployment",
                  "Capstone project + Demo Day pitch",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                  >
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-mst-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              {ASSESSMENT_TYPES.map((a) => (
                <div
                  key={a.type}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-[var(--text)]">{a.type}</span>
                    <span className="rounded-full bg-mst-red/10 px-3 py-0.5 text-sm font-bold text-mst-red">
                      {a.pct}%
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credential & grants (no wallet/validator vanity stats) */}
      <section id="credential" className="border-b border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mst-red/10 text-mst-red">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)]">
                On-Chain Credential
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                Complete all phases, pass every assessment, and submit your
                capstone to receive a verifiable certificate recorded on MST
                Blockchain — proof of job-ready Web3 skills.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mst-red/10 text-mst-red">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)]">
                Grant Funding Path
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                Top capstone projects may qualify for MST ecosystem grants to
                continue building after graduation. Pitch at Demo Day and
                compete for funding to launch your startup MVP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-elevated)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Layers,
                title: "4 Phases",
                desc: "Foundations → Tooling → MVP Build → Capstone",
              },
              {
                icon: Target,
                title: `${PROGRAMME_STATS.passThreshold}% Pass Rule`,
                desc: "Must pass each submodule assessment to progress",
              },
              {
                icon: FileText,
                title: "College Integrated",
                desc: "Structured syllabus aligned with academic standards",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mst-red/10 text-mst-red">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text)]">{f.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-[var(--text)]">
            Ready to start your Web3 journey?
          </h2>
          <p className="mt-4 text-[var(--text-muted)]">
            Enroll today and access the full learning tree, assessments, and
            live code execution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-mst-red px-8 py-3.5 font-semibold text-white transition hover:bg-mst-red-dark"
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-8 py-3.5 font-semibold text-[var(--text)] transition hover:border-mst-red"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
