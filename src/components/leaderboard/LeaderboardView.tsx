"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";
import { MarketingHeroBackground } from "@/components/marketing/MarketingHeroBackground";
import { RevealSection } from "@/components/marketing/RevealSection";
import {
  ArrowRight,
  Coins,
  Flame,
  Medal,
  Trophy,
  BookOpen,
} from "lucide-react";

const PODIUM_STYLES = [
  {
    order: "order-2 sm:order-2",
    height: "h-24 sm:h-36",
    medal: "text-amber-400",
    bg: "from-amber-500/30 to-amber-600/10",
    label: "1st",
    scale: "scale-105 sm:scale-110",
  },
  {
    order: "order-1 sm:order-1",
    height: "h-20 sm:h-28",
    medal: "text-gray-300",
    bg: "from-gray-400/25 to-gray-500/10",
    label: "2nd",
    scale: "",
  },
  {
    order: "order-3 sm:order-3",
    height: "h-16 sm:h-24",
    medal: "text-amber-700",
    bg: "from-orange-700/25 to-orange-800/10",
    label: "3rd",
    scale: "",
  },
];

function podiumOrder(entries: LeaderboardEntry[]) {
  const top = entries.slice(0, 3);
  if (top.length < 3) return top;
  return [top[1], top[0], top[2]];
}

function RankCard({ row, idx }: { row: LeaderboardEntry; idx: number }) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 ${
        row.isYou ? "ring-2 ring-mst-red/40 bg-mst-red/5" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mst-red/10 text-sm font-black text-mst-red">
            #{idx + 1}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-[var(--text)]">
              {row.name}
              {row.isYou && (
                <span className="ml-1 text-xs text-mst-red">(You)</span>
              )}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {row.modulesDone}/{row.totalModules} modules
            </p>
          </div>
        </div>
        <p className="text-xl font-black text-gradient-red">{row.score}%</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-orange-500">
          <Flame className="h-3.5 w-3.5" />
          {row.streak} day streak
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
          <Coins className="h-3.5 w-3.5" />
          {row.coins} $MSTC
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mst-red to-orange-500"
          style={{ width: `${row.score}%` }}
        />
      </div>
    </div>
  );
}

export function LeaderboardView() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(getLeaderboard());
    setMounted(true);
  }, []);

  const podium = podiumOrder(entries);

  return (
    <div className="overflow-hidden bg-[var(--bg)]">
      <section className="relative border-b border-[var(--border)]">
        <MarketingHeroBackground />
        <div className="relative mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mst-red">
            Academy Rankings
          </p>
          <h1 className="text-display mt-4 font-black text-[var(--text)]">
            <span className="text-gradient-red">Leaderboard</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-[var(--text-muted)]">
            Top learners ranked by course progress, daily coin streaks, and module
            completion.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {!mounted ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-mst-red" />
          </div>
        ) : (
          <>
            {/* Podium — fixed grid, no overlap */}
            <RevealSection>
              <div className="mx-auto grid max-w-lg grid-cols-3 items-end gap-2 sm:max-w-2xl sm:gap-6">
                {podium.map((entry, i) => {
                  const style = PODIUM_STYLES[i];
                  if (!entry || !style) return null;
                  return (
                    <div
                      key={entry.id}
                      className={`flex flex-col items-center ${style.order} ${style.scale}`}
                    >
                      <div
                        className={`mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border-2 text-base font-black sm:mb-3 sm:h-16 sm:w-16 sm:text-lg ${
                          entry.isYou
                            ? "border-mst-red bg-mst-red/10 text-mst-red"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                        }`}
                      >
                        {entry.name.charAt(0)}
                      </div>
                      <p className="max-w-[90px] truncate text-center text-xs font-bold text-[var(--text)] sm:max-w-none sm:text-sm">
                        {entry.name}
                      </p>
                      <p className="mt-0.5 text-lg font-black text-gradient-red sm:text-2xl">
                        {entry.score}%
                      </p>
                      <div
                        className={`mt-2 flex w-full flex-col items-center justify-end rounded-t-2xl bg-gradient-to-t ${style.bg} ${style.height} border border-b-0 border-[var(--border)] sm:mt-4`}
                      >
                        <Medal className={`mb-1 h-6 w-6 sm:mb-2 sm:h-8 sm:w-8 ${style.medal}`} />
                        <span className="pb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] sm:text-xs">
                          {style.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RevealSection>

            {/* Mobile cards */}
            <RevealSection className="mt-10 sm:hidden">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--text)]">
                <Trophy className="h-5 w-5 text-mst-red" />
                Full rankings
              </h2>
              <div className="space-y-3">
                {entries.map((row, idx) => (
                  <RankCard key={row.id} row={row} idx={idx} />
                ))}
              </div>
            </RevealSection>

            {/* Desktop table */}
            <RevealSection className="mt-12 hidden sm:block">
              <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
                <div className="border-b border-[var(--border)] bg-[var(--bg-muted)] px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-mst-red" />
                    <h2 className="text-lg font-bold text-[var(--text)]">
                      Full rankings
                    </h2>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        <th className="px-6 py-3">Rank</th>
                        <th className="px-6 py-3">Learner</th>
                        <th className="px-6 py-3">Progress</th>
                        <th className="px-6 py-3">Modules</th>
                        <th className="px-6 py-3">Streak</th>
                        <th className="px-6 py-3">$MSTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((row, idx) => (
                        <tr
                          key={row.id}
                          className={`border-b border-[var(--border)]/60 transition hover:bg-[var(--bg-muted)]/50 ${
                            row.isYou ? "bg-mst-red/5" : ""
                          }`}
                        >
                          <td className="px-6 py-4 font-black text-mst-red">
                            #{idx + 1}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[var(--text)]">
                            {row.name}
                            {row.isYou && (
                              <span className="ml-2 rounded-full bg-mst-red/10 px-2 py-0.5 text-[10px] font-bold text-mst-red">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 overflow-hidden rounded-full bg-[var(--border)]">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-mst-red to-orange-500"
                                  style={{ width: `${row.score}%` }}
                                />
                              </div>
                              <span className="font-bold">{row.score}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[var(--text-muted)]">
                            {row.modulesDone}/{row.totalModules}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 font-semibold text-orange-500">
                              <Flame className="h-4 w-4" />
                              {row.streak}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                              <Coins className="h-4 w-4" />
                              {row.coins}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </RevealSection>

            <div className="mt-10 text-center">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mst-red to-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-mst-red/25 transition hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-base"
              >
                <BookOpen className="h-5 w-5" />
                Climb the leaderboard — start learning
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
