export type FaceShape =
  | "oval"
  | "round"
  | "square"
  | "heart"
  | "diamond"
  | "rectangle";

export type HairLength = "short" | "medium" | "long";

export type EyeStyle = "circle" | "oval";

export type Transport = "bus" | "car" | "bike" | "walk";

export type ScienceFeeling = "love" | "fine" | "scary" | "dislike";

export type CharmShape = "circle" | "rectangle" | "star";

export interface Activity {
  id: string;
  label: string;
  shape: CharmShape;
}

export type EyebrowShape = "arc" | "peak" | "doublePeak" | "mShape" | "slanted";

export interface SiblingCounts {
  olderSisters: number;
  youngerSisters: number;
  olderBrothers: number;
  youngerBrothers: number;
}

export interface BioglyphData {
  faceShape: FaceShape | null;
  birthMonth: number | null;
  hairColor: string | null;
  hairLength: HairLength | null;
  eyeColor: string | null;
  eyeStyle: EyeStyle | null;
  eyebrowColor: string | null;
  transport: Transport | null;
  activities: string[];
  siblings: SiblingCounts;
  scienceFeeling: ScienceFeeling | null;
  iceCream: string | null;
  birthDay: number | null;
  freckleSplit: "split" | "single" | null;
  petTypeCount: number | null;
  studentName: string;
}

export const initialBioglyphData: BioglyphData = {
  faceShape: null,
  birthMonth: null,
  hairColor: null,
  hairLength: null,
  eyeColor: null,
  eyeStyle: null,
  eyebrowColor: null,
  transport: null,
  activities: [],
  siblings: {
    olderSisters: 0,
    youngerSisters: 0,
    olderBrothers: 0,
    youngerBrothers: 0,
  },
  scienceFeeling: null,
  iceCream: null,
  birthDay: null,
  freckleSplit: null,
  petTypeCount: 0,
  studentName: "",
};
