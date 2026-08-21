import {
  ACTIVITY_OPTIONS,
  EYEBROW_OPTIONS,
  EYE_COLORS,
  HAIR_COLORS,
  ICE_CREAM_FLAVORS,
  MONTHS,
  SCIENCE_FEELINGS,
  TRANSPORT_OPTIONS,
} from "./constants";
import { BioglyphData } from "./types";

function findLabel(list: { value: string; label: string }[], value: string | null) {
  return list.find((o) => o.value === value)?.label ?? "—";
}

export interface LegendRow {
  feature: string;
  meaning: string;
  yourAnswer: string;
}

export function buildLegend(data: BioglyphData): LegendRow[] {
  const siblingParts: string[] = [];
  if (data.siblings.olderSisters) siblingParts.push(`${data.siblings.olderSisters} older sister(s)`);
  if (data.siblings.youngerSisters) siblingParts.push(`${data.siblings.youngerSisters} younger sister(s)`);
  if (data.siblings.olderBrothers) siblingParts.push(`${data.siblings.olderBrothers} older brother(s)`);
  if (data.siblings.youngerBrothers) siblingParts.push(`${data.siblings.youngerBrothers} younger brother(s)`);

  return [
    {
      feature: "Face shape",
      meaning: "Just their face shape — no hidden meaning here.",
      yourAnswer: data.faceShape ?? "—",
    },
    {
      feature: "Hair strands",
      meaning: "Number of strands = birth month (Jan = 1 ... Dec = 12).",
      yourAnswer: data.birthMonth ? `${MONTHS[data.birthMonth - 1]} (${data.birthMonth} strands)` : "—",
    },
    {
      feature: "Hair color & length",
      meaning: "Favorite hair color, and how long they like it worn.",
      yourAnswer: `${findLabel(HAIR_COLORS, data.hairColor)}, ${data.hairLength ?? "—"}`,
    },
    {
      feature: "Eyes",
      meaning: "Eye color; oval eyes = wears glasses/contacts, circle = perfect vision.",
      yourAnswer: `${findLabel(EYE_COLORS, data.eyeColor)}, ${
        data.eyeStyle === "oval" ? "glasses/contacts" : "perfect vision"
      }`,
    },
    {
      feature: "Eyebrows",
      meaning: "Color and shape show their favorite color.",
      yourAnswer: findLabel(EYEBROW_OPTIONS, data.eyebrowColor),
    },
    {
      feature: "Nose",
      meaning: "Shape shows how they usually get to school (bus, car, bike, walk).",
      yourAnswer: findLabel(TRANSPORT_OPTIONS, data.transport),
    },
    {
      feature: "Charms (below chin)",
      meaning: "One shape per sport, club, or group they're part of.",
      yourAnswer:
        data.activities.length > 0
          ? data.activities
              .map((id) => ACTIVITY_OPTIONS.find((a) => a.id === id)?.label)
              .filter(Boolean)
              .join(", ")
          : "None",
    },
    {
      feature: "Ears",
      meaning:
        "Left ear = sisters, right ear = brothers. Higher dots = older, lower dots = younger.",
      yourAnswer: siblingParts.length ? siblingParts.join("; ") : "No siblings",
    },
    {
      feature: "Mouth",
      meaning: "Shape shows how they feel about science class.",
      yourAnswer: findLabel(SCIENCE_FEELINGS, data.scienceFeeling),
    },
    {
      feature: "Cheeks",
      meaning: "Color shows their favorite ice cream flavor.",
      yourAnswer: findLabel(ICE_CREAM_FLAVORS, data.iceCream),
    },
    {
      feature: "Freckles",
      meaning: "Count = day of the month they were born.",
      yourAnswer: data.birthDay ? `Born on the ${data.birthDay}${ordinal(data.birthDay)} (${data.birthDay} freckles)` : "—",
    },
    {
      feature: "Eyelashes",
      meaning: "Count = number of different types of pets they have.",
      yourAnswer:
        data.petTypeCount === null
          ? "—"
          : data.petTypeCount === 0
          ? "No pets"
          : `${data.petTypeCount} pet type(s)`,
    },
  ];
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
