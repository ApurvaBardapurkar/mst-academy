"use client";

import { useAuth } from "@/components/AuthProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Curriculum } from "@/lib/types";
import { canAccessDashboard, roleLabel } from "@/lib/auth";
import { computeStudentAnalytics } from "@/lib/student-analytics";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Flame,
  LayoutDashboard,
  LogOut,
  Map,
  Play,
  Sparkles,
  Target,
  Trophy,
  TreePine,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Clock,
  Gift,
  Copy,
  Wallet,
  CheckCircle2,
} from "lucide-react";

function GlassCard({
  children,
  className = "",
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-5 backdrop-blur-md shadow-lg transition hover:border-[var(--border-strong)] ${className}`}
      style={glow ? { boxShadow: `0 0 40px ${glow}` } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/5 via-transparent to-mst-red/5" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} stroke="var(--border)" strokeWidth="8" fill="none" />
        <circle
          cx="44"
          cy="44"
          r={r}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <p className="-mt-12 text-lg font-black text-[var(--text)]">{value}%</p>
      <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
    </div>
  );
}

export function StudentCommandCenter({ curriculum }: { curriculum: Curriculum }) {
  const router = useRouter();
  const { user, ready, logout, isAdmin } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [withdrawRequested, setWithdrawRequested] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login?role=student");
      return;
    }
    if (!canAccessDashboard("student")) router.replace("/login");
  }, [ready, user, router]);

  const analytics = useMemo(() => {
    if (!mounted) return null;
    return computeStudentAnalytics(curriculum);
  }, [mounted, curriculum]);

  if (!ready || !user || !analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-mst-red" />
      </div>
    );
  }

  const firstName = user.fullName.split(" ")[0];
  const referralCode = `MST-${user.id.slice(-6).toUpperCase()}`;
  const referralLink = `https://masterstroke.academy/register?ref=${referralCode}`;
  const referralRecords = [
    { name: "Riya S.", joinedAt: "12 May 2026", status: "Completed course", eligible: true },
    { name: "Aman K.", joinedAt: "14 May 2026", status: "Completed course", eligible: true },
    { name: "Neha P.", joinedAt: "16 May 2026", status: "In progress", eligible: false },
    { name: "Vikram T.", joinedAt: "18 May 2026", status: "Completed course", eligible: true },
    { name: "Priya M.", joinedAt: "21 May 2026", status: "Completed course", eligible: true },
    { name: "Rohit D.", joinedAt: "24 May 2026", status: "Completed course", eligible: true },
  ] as const;
  const successfulReferrals = referralRecords.filter((record) => record.eligible).length;
  const withdrawUnlocked = successfulReferrals >= 5;
  const xpPct = Math.round(
    ((analytics.xp % 120) / Math.max(analytics.xpToNext, 1)) * 100
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 10%, rgba(168,85,247,0.12), transparent 55%), radial-gradient(ellipse 45% 35% at 80% 80%, rgba(59,130,246,0.1), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-7xl gap-0 lg:gap-8">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md lg:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
            <div className="mb-8 flex items-center gap-3 px-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-mst-red to-orange-500 text-sm font-black text-white shadow-lg shadow-mst-red/30">
                {user.fullName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[var(--text)]">{user.fullName}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Level {analytics.level}
                </p>
              </div>
            </div>
            <nav className="flex-1 space-y-1">
              {[
                { href: "/dashboard/student", icon: LayoutDashboard, label: "Command Center", active: true },
                { href: "/learn", icon: TreePine, label: "Learning Roadmap" },
                { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
                { href: "#refer-earn", icon: Gift, label: "Refer & Earn" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    item.active
                      ? "bg-mst-red/10 text-mst-red"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-2 border-t border-[var(--border)] pt-4">
              <ThemeToggle className="w-full justify-start gap-2 rounded-xl px-3 py-2 text-sm" />
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-muted)]"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:py-8">
          {/* Mobile header */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <p className="text-sm font-bold text-[var(--text)]">Command Center</p>
            <ThemeToggle />
          </div>

          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/70 p-6 backdrop-blur-md sm:p-8"
            style={{ boxShadow: "0 0 60px rgba(168,85,247,0.08)" }}
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-mst-red/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mst-red">
                  Personal learning command center
                </p>
                <h1 className="mt-2 text-2xl font-black text-[var(--text)] sm:text-3xl">
                  Welcome back, {firstName} 👋
                </h1>
                <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
                  You are ahead of{" "}
                  <strong className="text-[var(--text)]">{analytics.percentile}%</strong> of
                  learners this week. Keep pushing — your next milestone is close.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">
                    <Flame className="mr-1 inline h-3.5 w-3.5" />
                    {analytics.streakDays}d streak
                  </span>
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400">
                    Phase: {analytics.currentPhaseTitle.slice(0, 28)}
                  </span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400">
                    Rank #{analytics.rank}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-5">
                <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="6" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#lvlGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${xpPct * 2.64} 264`}
                    />
                    <defs>
                      <linearGradient id="lvlGrad" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#e31e24" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <p className="text-2xl font-black text-[var(--text)]">L{analytics.level}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Level
                    </p>
                  </div>
                </div>
                <div className="min-w-[140px]">
                  <p className="text-xs font-bold text-[var(--text-muted)]">XP Progress</p>
                  <p className="text-lg font-black text-[var(--text)]">{analytics.xp} XP</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--border)]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-mst-red via-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, xpPct)}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--text-muted)]">
                    {analytics.xpToNext} XP to Level {analytics.level + 1}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 px-4 py-3">
              <p className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                <span>
                  <strong className="text-[var(--text)]">AI Mentor:</strong>{" "}
                  {analytics.insights[0] ?? "Start your first lesson to unlock personalized insights."}
                </span>
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#refer-earn"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-500 transition hover:bg-emerald-500/20"
              >
                <Gift className="h-3.5 w-3.5" />
                Open Refer & Earn
              </a>
            </div>
          </motion.section>

          {/* Stats grid */}
          <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { label: "Completion", value: `${analytics.overallProgress}%`, icon: Target, color: "text-mst-red" },
              { label: "Modules", value: `${analytics.modulesCompleted}/${analytics.totalModules}`, icon: BookOpen, color: "text-emerald-500" },
              { label: "Avg Score", value: analytics.averageScore > 0 ? `${analytics.averageScore}%` : "—", icon: Award, color: "text-amber-500" },
              { label: "Study Time", value: `${analytics.totalStudyHours}h`, icon: Clock, color: "text-blue-400" },
              { label: "Focus", value: `${analytics.focusScore}%`, icon: Zap, color: "text-orange-500" },
              { label: "Consistency", value: `${analytics.revisionConsistency}%`, icon: TrendingUp, color: "text-purple-400" },
              { label: "Coins", value: analytics.coinBalance, icon: Flame, color: "text-amber-500" },
              { label: "Percentile", value: `Top ${analytics.percentile}%`, icon: Trophy, color: "text-mst-red" },
            ].map((s, i) => (
              <GlassCard key={s.label} className="!p-4">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {s.label}
                </p>
                <p className="mt-1 text-xl font-black text-[var(--text)]">{s.value}</p>
              </GlassCard>
            ))}
          </section>

          {/* Phase journey */}
          <section id="refer-earn" className="mt-8 scroll-mt-24">
            <h2 className="mb-4 text-lg font-black text-[var(--text)]">Learning Journey</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {analytics.phaseJourney.map((ph, i) => (
                <Link
                  key={ph.phaseId}
                  href="/learn"
                  className={`group relative overflow-hidden rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                    ph.status === "active"
                      ? "border-orange-500/50 bg-orange-500/5 shadow-lg shadow-orange-500/10"
                      : ph.status === "completed"
                        ? "border-emerald-500/40 bg-emerald-500/5"
                        : "border-[var(--border)] bg-[var(--surface)]/60 opacity-70"
                  }`}
                >
                  {ph.status === "active" && (
                    <span className="absolute right-3 top-3 h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                  )}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Phase {i + 1}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-bold text-[var(--text)]">{ph.title}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className={`h-full rounded-full transition-all ${
                        ph.status === "completed"
                          ? "bg-emerald-500"
                          : "bg-gradient-to-r from-mst-red to-orange-500"
                      }`}
                      style={{ width: `${ph.percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs font-bold text-[var(--text-muted)]">{ph.percent}%</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Charts row 1 */}
          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h3 className="text-sm font-black text-[var(--text)]">Your Learning Growth</h3>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.growthData}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }} />
                    <Line type="monotone" dataKey="progress" stroke="#e31e24" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-sm font-black text-[var(--text)]">Skill Strength Analysis</h3>
              <div className="mt-2 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analytics.skillRadar}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--text-muted)", fontSize: 9 }} />
                    <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </section>

          {/* Charts row 2 */}
          <section className="mt-4 grid gap-4 lg:grid-cols-3">
            <GlassCard className="lg:col-span-1">
              <h3 className="text-sm font-black text-[var(--text)]">Course Completion</h3>
              <div className="mt-2 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.completionDonut}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                    >
                      {analytics.completionDonut.map((e) => (
                        <Cell key={e.name} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold">
                {analytics.completionDonut.map((e) => (
                  <span key={e.name} className="flex items-center gap-1 text-[var(--text-muted)]">
                    <span className="h-2 w-2 rounded-full" style={{ background: e.color }} />
                    {e.name}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-2">
              <h3 className="text-sm font-black text-[var(--text)]">Module Performance</h3>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.moduleScores.length ? analytics.moduleScores : [{ name: "—", score: 0, moduleId: 0 }]}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]} fill="#e31e24" maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </section>

          {/* Heatmap + study time */}
          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <GlassCard>
              <h3 className="text-sm font-black text-[var(--text)]">Daily Consistency</h3>
              <div className="mt-4 grid grid-cols-12 gap-1 sm:grid-cols-[repeat(28,minmax(0,1fr))]">
                {analytics.activityHeatmap.slice(-84).map((d) => (
                  <div
                    key={d.date}
                    title={`${d.date}: ${d.count} activities`}
                    className="aspect-square rounded-sm"
                    style={{
                      background:
                        d.count === 0
                          ? "var(--border)"
                          : d.count === 1
                            ? "rgba(227,30,36,0.35)"
                            : d.count >= 3
                              ? "#e31e24"
                              : "rgba(227,30,36,0.65)",
                    }}
                  />
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-sm font-black text-[var(--text)]">Weekly Study Time</h3>
              <div className="mt-4 h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.dailyStudy}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </section>

          {/* AI Insights */}
          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-[var(--text)]">
              <Brain className="h-5 w-5 text-purple-400" />
              AI Improvement Insights
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {analytics.insights.map((text, i) => (
                <GlassCard key={i} glow="rgba(168,85,247,0.12)">
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
                </GlassCard>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <GlassCard>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-500">Strengths</p>
                <p className="mt-2 text-sm font-semibold text-[var(--text)]">
                  {analytics.strengths.length ? analytics.strengths.join(" · ") : "Complete assessments to discover strengths"}
                </p>
              </GlassCard>
              <GlassCard>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-500">Improve</p>
                <p className="mt-2 text-sm font-semibold text-[var(--text)]">
                  {analytics.weaknesses.length ? analytics.weaknesses.join(" · ") : "Keep learning — weaknesses will appear here"}
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Learning health */}
          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-[var(--text)]">
              <Shield className="h-5 w-5 text-blue-400" />
              Learning Health
            </h2>
            <GlassCard>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                <Gauge value={100 - analytics.health.burnoutRisk} label="Energy" color="#22c55e" />
                <Gauge value={analytics.health.focusScore} label="Focus" color="#f97316" />
                <Gauge value={analytics.health.retentionScore} label="Retention" color="#a855f7" />
                <Gauge value={analytics.health.revisionHealth} label="Revision" color="#3b82f6" />
                <Gauge value={analytics.health.learningSpeed} label="Speed" color="#eab308" />
                <Gauge value={analytics.health.confidence} label="Confidence" color="#e31e24" />
              </div>
            </GlassCard>
          </section>

          {/* Next actions */}
          <section className="mt-8">
            <h2 className="mb-4 text-lg font-black text-[var(--text)]">What To Do Next</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {analytics.nextActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`group flex items-center justify-between rounded-2xl border px-5 py-4 transition hover:-translate-y-0.5 ${
                    action.priority === "high"
                      ? "border-mst-red/40 bg-gradient-to-r from-mst-red/10 to-orange-500/5 hover:shadow-lg hover:shadow-mst-red/10"
                      : "border-[var(--border)] bg-[var(--surface)]/70 hover:border-purple-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {action.icon === "play" && <Play className="h-5 w-5 text-mst-red" />}
                    {action.icon === "map" && <Map className="h-5 w-5 text-purple-400" />}
                    {action.icon === "brain" && <Brain className="h-5 w-5 text-blue-400" />}
                    {action.icon === "trophy" && <Trophy className="h-5 w-5 text-amber-500" />}
                    <span className="text-sm font-bold text-[var(--text)]">{action.label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--text-muted)] transition group-hover:translate-x-0.5 group-hover:text-mst-red" />
                </Link>
              ))}
            </div>
          </section>

          {/* Achievements + ranking */}
          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-black text-[var(--text)]">Achievements</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {analytics.achievements.map((a) => (
                  <div
                    key={a.id}
                    className={`rounded-2xl border p-4 text-center transition ${
                      a.unlocked
                        ? "border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/10"
                        : "border-[var(--border)] bg-[var(--surface)]/50 opacity-50 grayscale"
                    }`}
                  >
                    <span className="text-2xl">{a.emoji}</span>
                    <p className="mt-2 text-xs font-black text-[var(--text)]">{a.title}</p>
                    <p className="mt-1 text-[10px] text-[var(--text-muted)]">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <GlassCard glow="rgba(227,30,36,0.1)">
              <h3 className="text-sm font-black text-[var(--text)]">Community Ranking</h3>
              <p className="mt-4 text-4xl font-black text-gradient-red">#{analytics.rank}</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Top {analytics.percentile}% of academy learners
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Modules completed</span>
                  <span className="font-bold">{analytics.modulesCompleted}/{analytics.totalModules}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Coin balance</span>
                  <span className="font-bold text-amber-500">{analytics.coinBalance} $MSTC</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Current module</span>
                  <span className="font-bold truncate max-w-[160px]">{analytics.activeModuleTitle}</span>
                </p>
              </div>
              <Link
                href="/leaderboard"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-mst-red hover:underline"
              >
                View full leaderboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-[var(--text)]">
              <Gift className="h-5 w-5 text-emerald-500" />
              Refer &amp; Earn
            </h2>
            <div className="grid gap-4 lg:grid-cols-3">
              <GlassCard className="lg:col-span-1" glow="rgba(34,197,94,0.14)">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Your referral code
                </p>
                <p className="mt-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-mono text-lg font-black text-emerald-500">
                  {referralCode}
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Share link
                </p>
                <p className="mt-1 break-all rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-3 py-2 text-xs text-[var(--text-muted)]">
                  {referralLink}
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(referralLink);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1500);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-bold text-[var(--text)] transition hover:border-emerald-500/40 hover:bg-emerald-500/10"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied" : "Copy referral link"}
                </button>
                <p className="mt-3 text-xs text-[var(--text-muted)]">
                  Flat reward: <strong className="text-[var(--text)]">Rs 500</strong> per successful referral.
                </p>
              </GlassCard>

              <GlassCard className="lg:col-span-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Referral records
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Withdrawal unlocks after 5 successful referrals where each referee completes the full course.
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-500">
                    Successful: {successfulReferrals}/5
                  </div>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        <th className="py-2 pr-3">Referee</th>
                        <th className="py-2 pr-3">Joined</th>
                        <th className="py-2 pr-3">Status</th>
                        <th className="py-2 pr-3">Reward</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referralRecords.map((record) => (
                        <tr key={`${record.name}-${record.joinedAt}`} className="border-b border-[var(--border)]/60 last:border-b-0">
                          <td className="py-2 pr-3 font-semibold text-[var(--text)]">{record.name}</td>
                          <td className="py-2 pr-3 text-[var(--text-muted)]">{record.joinedAt}</td>
                          <td className="py-2 pr-3">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${record.eligible ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                              {record.eligible ? <CheckCircle2 className="h-3 w-3" /> : null}
                              {record.status}
                            </span>
                          </td>
                          <td className="py-2 pr-3 font-semibold text-[var(--text)]">
                            {record.eligible ? "Rs 500" : "Pending"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-muted)] px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-[var(--text)]">Withdraw Referral Earnings</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {withdrawUnlocked
                        ? "You can now request withdrawal."
                        : `Complete ${5 - successfulReferrals} more successful referral(s) to unlock withdrawal.`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWithdrawRequested(true)}
                    disabled={!withdrawUnlocked || withdrawRequested}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    {withdrawRequested ? "Withdrawal Requested" : "Request Withdrawal"}
                  </button>
                </div>
              </GlassCard>
            </div>
          </section>

          <div className="mt-10 pb-8 text-center">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mst-red to-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-mst-red/25 transition hover:brightness-110"
            >
              <TreePine className="h-5 w-5" />
              Continue on Learning Roadmap
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
