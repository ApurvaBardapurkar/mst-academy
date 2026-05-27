"use client";

import Link from "next/link";
import { Typewriter } from "@/components/marketing/Typewriter";
import { AnimatedCounter } from "@/components/marketing/AnimatedCounter";
import { useInView } from "@/components/marketing/useInView";
import type { Phase } from "@/lib/types";
import { PHASE_HOURS } from "@/lib/academy-overview";
import {
  TreePine,
  Monitor,
  Code2,
  BarChart3,
  Link2,
  Award,
  ChevronRight,
  Blocks,
  Layers,
  Rocket,
  Zap,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: TreePine,
    title: "Interactive Learning Tree",
    description:
      "Navigate a visual learning tree that maps your entire journey from fundamentals to advanced topics.",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Monitor,
    title: "Full-screen Assessments",
    description:
      "Test your knowledge with immersive, lockdown-mode assessments designed to validate real understanding.",
    gradient: "from-mst-red/20 to-orange-500/10",
  },
  {
    icon: Code2,
    title: "Live Code Execution",
    description:
      "Write and execute Solidity, JavaScript, and more directly in the browser with instant feedback.",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Track completion across all 4 phases and 21 modules with detailed analytics on your progress.",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Link2,
    title: "Blockchain Focus",
    description:
      "Purpose-built for Web3. Every module is tailored to blockchain development, DeFi, NFTs, and DAOs.",
    gradient: "from-amber-500/20 to-yellow-500/10",
  },
  {
    icon: Award,
    title: "Certificate on Completion",
    description:
      "Earn a verifiable certificate upon completing the full curriculum, proving your blockchain expertise.",
    gradient: "from-rose-500/20 to-red-500/10",
  },
];

const PHASE_ICONS = [Blocks, Cpu, Layers, Rocket];
const PHASE_COLORS = [
  "var(--accent-blue)",
  "var(--mst-red)",
  "var(--accent-purple)",
  "var(--accent-green)",
];

const topics = [
  "Solidity",
  "DeFi",
  "NFTs",
  "DAOs",
  "Smart Contracts",
  "Cryptography",
  "Consensus",
  "EVM",
  "Hardhat",
  "ZK Proofs",
  "RWA",
  "MST Chain",
  "Token Standards",
  "Layer 2",
  "Web3.js",
  "Security Audits",
];

interface LandingPageProps {
  phases: Phase[];
  moduleCount: number;
  submoduleCount: number;
}

function RevealSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function LandingPage({
  phases,
  moduleCount,
  submoduleCount,
}: LandingPageProps) {
  const statsRef = useInView(0.3);

  return (
    <div className="overflow-hidden bg-[var(--bg)]">
      {/* Hero */}
      <section className="bg-grid relative min-h-[90vh] overflow-hidden">
        <div className="landing-glow pointer-events-none absolute inset-0" />
        <div
          className="hero-orb pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-mst-red/20 blur-3xl"
          aria-hidden
        />
        <div
          className="hero-orb hero-orb-delay-1 pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-[var(--accent-purple)]/15 blur-3xl"
          aria-hidden
        />
        <div
          className="hero-orb hero-orb-delay-2 pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[var(--accent-cyan)]/10 blur-3xl"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-mst-red/30 bg-gradient-to-r from-mst-red/10 via-transparent to-[var(--accent-purple)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mst-red shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              MST Blockchain Academy
            </p>

            <h1 className="mt-8 text-4xl font-black leading-[1.08] tracking-tight text-[var(--text)] sm:text-5xl lg:text-7xl">
              Master Blockchain{" "}
              <span className="block sm:inline">
                <Typewriter
                  strings={[
                    "From Zero to Production",
                    "Learn • Build • Deploy",
                    "Fundamentals to Capstone",
                  ]}
                  speedMs={42}
                  pauseMs={900}
                  className="text-gradient-red animate-gradient"
                />
              </span>
            </h1>

            <p className="animate-slide-up stagger-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
              A structured, college-integrated programme — interactive lessons,
              live code, rigorous assessments, and a path from cryptography to
              funded founder.
            </p>

            <div className="animate-slide-up stagger-3 mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/learn"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-mst-red to-red-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-mst-red/25 transition hover:shadow-xl hover:shadow-mst-red/35"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/academy-overview"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/80 px-8 py-3.5 font-semibold text-[var(--text)] backdrop-blur-sm transition hover:border-mst-red hover:bg-[var(--bg-muted)]"
              >
                Explore Curriculum
              </Link>
            </div>
          </div>

          {/* Phase path */}
          <div className="animate-slide-up stagger-4 mx-auto mt-20 max-w-4xl">
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 backdrop-blur-md sm:p-8">
              <div className="absolute inset-x-8 top-[3.25rem] hidden h-0.5 bg-gradient-to-r from-[var(--accent-blue)] via-mst-red to-[var(--accent-green)] sm:block" />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {phases.map((phase, i) => {
                  const Icon = PHASE_ICONS[i] ?? Blocks;
                  const color = PHASE_COLORS[i];
                  const hours = PHASE_HOURS[phase.id]?.hours;
                  return (
                    <div key={phase.id} className="relative flex flex-col items-center text-center">
                      <div
                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 bg-[var(--bg)] shadow-lg transition-transform hover:scale-105"
                        style={{ borderColor: color }}
                      >
                        <Icon className="h-6 w-6" style={{ color }} />
                      </div>
                      <p
                        className="mt-3 text-xs font-bold uppercase tracking-wider"
                        style={{ color }}
                      >
                        Phase {i + 1}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[10px] font-medium text-[var(--text-muted)] sm:text-xs">
                        {phase.modules.length} modules
                        {hours ? ` · ~${hours}h` : ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef.ref}
        className="relative border-y border-[var(--border)] bg-gradient-to-r from-[var(--bg-elevated)] via-[var(--surface)] to-[var(--bg-elevated)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-subtle opacity-80" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 sm:grid-cols-4">
          {[
            { end: 4, suffix: "", label: "Phases" },
            { end: moduleCount, suffix: "", label: "Modules" },
            { end: submoduleCount, suffix: "+", label: "Submodules" },
            { end: 130, suffix: "+", label: "Hours" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`border-[var(--border)] px-4 py-12 text-center sm:py-14 ${
                i > 0 ? "border-l" : ""
              } ${statsRef.visible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-3xl font-black text-gradient-red sm:text-5xl">
                {statsRef.visible ? (
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                ) : (
                  "0"
                )}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealSection className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mst-red">
              Platform Features
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Everything you need to become a{" "}
              <span className="text-gradient-red">blockchain developer</span>
            </h2>
          </RevealSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <RevealSection key={feature.title}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mst-red/40 hover:shadow-xl`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mst-red/10 ring-1 ring-mst-red/20">
                      <feature.icon className="h-5 w-5 text-mst-red" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text)]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section
        id="curriculum"
        className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)] py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-mst-red/5 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealSection className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mst-red">
              Curriculum
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              4 phases to blockchain mastery
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">
              Progressive syllabus from internet foundations to capstone deployment
              and grant funding.
            </p>
          </RevealSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {phases.map((phase, i) => {
              const Icon = PHASE_ICONS[i] ?? Blocks;
              const color = PHASE_COLORS[i];
              const hours = PHASE_HOURS[phase.id];
              return (
                <RevealSection key={phase.id}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--border-strong)] hover:shadow-xl sm:p-8">
                    <div
                      className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40"
                      style={{ backgroundColor: color }}
                    />
                    <div
                      className="absolute right-4 top-4 text-[5rem] font-black leading-none opacity-[0.05]"
                      style={{ color }}
                    >
                      {i + 1}
                    </div>
                    <div className="relative">
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${color}22` }}
                      >
                        <Icon className="h-6 w-6" style={{ color }} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color }}
                        >
                          Phase {i + 1}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          · {phase.modules.length} modules
                          {hours ? ` · ~${hours.hours} hrs` : ""}
                        </span>
                      </div>
                      <h3 className="mt-2 text-xl font-bold text-[var(--text)]">
                        {phase.title}
                      </h3>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>

          <RevealSection className="mt-10 text-center">
            <Link
              href="/academy-overview"
              className="group inline-flex items-center gap-2 rounded-full border border-mst-red/30 bg-mst-red/5 px-6 py-3 text-sm font-semibold text-mst-red transition hover:bg-mst-red hover:text-white"
            >
              View full curriculum with every submodule
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Marquee topics */}
      <section className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-10">
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--surface)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--surface)] to-transparent" />
          <div className="marquee-track gap-3 px-3">
            {[...topics, ...topics].map((topic, i) => (
              <span
                key={`${topic}-${i}`}
                className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-2 text-sm font-semibold text-[var(--text)]"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] via-[var(--bg-muted)] to-[var(--surface)] p-8 sm:p-12">
            <div className="bg-pattern-dots absolute inset-0 opacity-40" />
            <div className="relative grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "75% pass rule",
                  desc: "Unlock the next lesson only when you truly understand the material.",
                },
                {
                  icon: Zap,
                  title: "Live on MST Chain",
                  desc: "Deploy and test on an EVM-compatible hybrid Layer-1 built for India.",
                },
                {
                  icon: GraduationCap,
                  title: "College integrated",
                  desc: "Structured syllabus aligned with academic and industry standards.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center sm:text-left">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-mst-red/10 sm:mx-0">
                    <item.icon className="h-5 w-5 text-mst-red" />
                  </div>
                  <p className="font-bold text-[var(--text)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[var(--border)]">
        <div className="absolute inset-0 bg-gradient-to-br from-mst-red/10 via-transparent to-[var(--accent-purple)]/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <RevealSection>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mst-red to-red-700 shadow-lg shadow-mst-red/30">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[var(--text)] sm:text-4xl">
              Ready to start your{" "}
              <span className="text-gradient-red">Web3 journey</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--text-muted)]">
              Join Masterstroke Academy — from zero blockchain knowledge to
              building, auditing, and pitching production-grade dApps.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mst-red to-red-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-mst-red/25 transition hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-8 py-3.5 font-semibold text-[var(--text)] transition hover:border-mst-red"
              >
                Open Learning Tree
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
