import { resorts } from "@/data/resorts";
import { PlannerAnswers, Resort } from "@/lib/types";

const INTEREST_TAGS: Record<string, string[]> = {
  "Off-piste & freeride": ["Off-piste & freeride", "Advanced & expert skiers"],
  "Fine dining": ["Fine dining"],
  "Nightlife & après": ["Nightlife"],
  "Wellness & spa": ["Wellness & spa"],
  "Heli-skiing": ["Heli-skiing"],
  "Family friendly": ["Family multi-generational trips", "Gentle-to-intermediate skiing"],
  "Multi-activity / non-ski": ["Multi-activity holidays", "Combining with a wider NZ itinerary"],
  "Privacy & discretion": ["Privacy & discretion"],
};

export interface PlannerMatch {
  resort: Resort;
  score: number;
  reasons: string[];
}

export function matchResorts(answers: PlannerAnswers): PlannerMatch[] {
  const candidates =
    answers.resortPreference === "surprise-me"
      ? resorts
      : resorts.filter((r) => r.slug === answers.resortPreference);

  const scored = candidates.map((resort) => {
    let score = 0;
    const reasons: string[] = [];

    for (const interest of answers.interests) {
      const tags = INTEREST_TAGS[interest] ?? [];
      const hit = tags.find((tag) => resort.bestFor.includes(tag));
      if (hit) {
        score += 2;
        reasons.push(`Matches your interest in ${interest.toLowerCase()}`);
      }
    }

    if (
      answers.experience === "Beginner" &&
      resort.difficultyMix.beginner >= 20
    ) {
      score += 1;
      reasons.push("Good proportion of beginner-friendly terrain");
    }
    if (
      answers.experience === "Advanced / expert" &&
      resort.difficultyMix.advanced >= 35
    ) {
      score += 2;
      reasons.push("Strong advanced and off-piste terrain share");
    }

    if (answers.party === "Family with children" && resort.bestFor.includes("Family multi-generational trips")) {
      score += 2;
      reasons.push("Well suited to family and multi-generational groups");
    }
    if (answers.party === "Group of friends" && resort.bestFor.includes("Group ski trips")) {
      score += 1;
      reasons.push("Popular with larger friend groups");
    }
    if (answers.party === "Group of friends" && resort.bestFor.includes("Nightlife")) {
      score += 1;
      reasons.push("Strong après and nightlife scene for groups");
    }

    return { resort, score, reasons };
  });

  return scored.sort((a, b) => b.score - a.score);
}

export const PLANNER_MONTHS = [
  "December",
  "January",
  "February",
  "March",
  "June",
  "July",
  "August",
  "September",
];

export const PLANNER_DURATIONS = ["Long weekend (3-4 nights)", "One week", "Two weeks", "Three weeks or more"];

export const PLANNER_PARTIES = [
  "Couple",
  "Family with children",
  "Group of friends",
  "Solo",
];

export const PLANNER_EXPERIENCE = [
  "Beginner",
  "Intermediate",
  "Advanced / expert",
  "Mixed ability group",
];

export const PLANNER_INTERESTS = Object.keys(INTEREST_TAGS);
