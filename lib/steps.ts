import { BioglyphData } from "./types";

export interface StepMeta {
  key: string;
  title: string;
  feature: string;
  isValid: (data: BioglyphData) => boolean;
}

export const STEPS: StepMeta[] = [
  {
    key: "faceShape",
    title: "Face Shape",
    feature: "Face",
    isValid: (d) => d.faceShape !== null,
  },
  {
    key: "hair",
    title: "Hair",
    feature: "Hair",
    isValid: (d) => d.birthMonth !== null && d.hairColor !== null && d.hairLength !== null,
  },
  {
    key: "eyes",
    title: "Eyes",
    feature: "Eyes",
    isValid: (d) => d.eyeColor !== null && d.eyeStyle !== null,
  },
  {
    key: "eyebrows",
    title: "Eyebrows",
    feature: "Eyebrows",
    isValid: (d) => d.eyebrowColor !== null,
  },
  {
    key: "nose",
    title: "Nose",
    feature: "Nose",
    isValid: (d) => d.transport !== null,
  },
  {
    key: "charms",
    title: "Charms",
    feature: "Charms",
    isValid: () => true,
  },
  {
    key: "ears",
    title: "Ears",
    feature: "Ears",
    isValid: () => true,
  },
  {
    key: "mouth",
    title: "Mouth",
    feature: "Mouth",
    isValid: (d) => d.scienceFeeling !== null,
  },
  {
    key: "cheeks",
    title: "Cheeks",
    feature: "Cheeks",
    isValid: (d) => d.iceCream !== null,
  },
  {
    key: "freckles",
    title: "Freckles",
    feature: "Freckles",
    isValid: (d) => d.birthDay !== null && d.freckleSplit !== null,
  },
  {
    key: "eyelashes",
    title: "Eyelashes",
    feature: "Eyelashes",
    isValid: () => true,
  },
  {
    key: "final",
    title: "Your Bioglyph",
    feature: "Final",
    isValid: () => true,
  },
];
