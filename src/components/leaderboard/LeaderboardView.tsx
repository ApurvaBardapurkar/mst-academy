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
    order: "order-2",
    height: "h-28 sm:h-36",
    medal: "text-amber-400",
    bg: "from-amber-500/30 to-amber-600/10",
    label: "1st",
  },
  {
    order: "order-1",
    height: "h-24 sm:h-28",
    medal: "text-gray-300",
    bg: "from-gray-400/25 to-gray-500/10",
    label: "2nd",
  },
  {
    order: "order-3",
    height: "h-20 sm:h-24",
    medal: "text-amber-700",
    bg: "from-orange-700/25 to-orange-800/10",
    label: "3rd",
  },
];

function podiumOrder(entries: LeaderboardEntry[]) {
  const top = entries.slice(0, 3);
  if (top.length < 3) return top;
  return [top[1], top[0], top[2]];
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
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-mst-red">
            Academy Rankings
          </p>
          <h1 className="text-display mt-4 font-black text-[var(--text)]">
            <span className="text-gradient-red">Leaderboard</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--text-muted)]">
            Top learners ranked by course progress, daily coin streaks, and module
            completion.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        {!mounted ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-mst-red" />
          </div>
        ) : (
          <>
            {/* Podium */}
            <RevealSection>
              <div className="flex items-end justify-center gap-3 sm:gap-6">
                {podium.map((entry, i) => {
                  const style = PODIUM_STYLES[i];
                  return (
                    <div
                      key={entry.id}
                      className={`flex w-28 flex-col items-center sm:w-36 ${style.order}`}
                    >
                      <div
                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-lg font-black sm:h-16 sm:w-16 ${
                          entry.isYou
                            ? "border-mst-red bg-mst-red/10 text-mst-red"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                        }`}
                      >
                        {entry.name.charAt(0)}
                      </div>
                      <p className="text-center text-sm font-bold text-[var(--text)]">
                        {entry.name}
                        {entry.isYou && (
                          <span className="ml-1 text-xs text-mst-red">(You)</span>
                        )}
                      </p>
                      <p className="mt-1 text-2xl font-black text-gradient-red">
                        {entry.score}%
                      </p>
                      <div
                        className={`mt-4 flex w-full flex-col items-center justify-end rounded-t-2xl bg-gradient-to-t ${style.bg} ${style.height} border border-b-0 border-[var(--border)]`}
                      >
                        <Medal className={`mb-2 h-8 w-8 ${style.medal}`} />
                        <span className="pb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          {style.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RevealSection>

            {/* Table */}
            <RevealSection className="mt-12">
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
                  <table className="w-full min-w-[640px] text-left text-sm">
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-mst-red to-red-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-mst-red/25 transition hover:shadow-xl"
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
