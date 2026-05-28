import type { Metadata } from "next";
import { getCurriculum } from "@/lib/curriculum";
import { AcademyOverview } from "@/components/marketing/AcademyOverview";

export const metadata: Metadata = {
  title: "Curriculum Overview | Masterstroke Academy",
  description:
    "Explore the full Masterstroke Academy programme — 4 phases, 21 modules, 122+ submodules, and 130+ hours of structured Web3 learning.",
};

export default function AcademyOverviewPage() {
  const curriculum = getCurriculum();
  return <AcademyOverview curriculum={curriculum} />;
}
