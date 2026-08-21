import { Activity, CharmShape, EyebrowShape, EyeGaze, FaceShape, HairTexture, ScienceFeeling, Transport } from "./types";

export const FACE_SHAPES: { value: FaceShape; label: string }[] = [
  { value: "round", label: "Circle" },
  { value: "oval", label: "Oval" },
  { value: "square", label: "Square" },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface HairColorOption {
  value: string;
  label: string;
  texture: HairTexture;
}

export const HAIR_COLORS: HairColorOption[] = [
  { value: "#e8c26b", label: "Blonde", texture: "straight" },
  { value: "#2b1b12", label: "Black", texture: "curl" },
  { value: "#5c3a21", label: "Brunette", texture: "zigzag" },
  { value: "#e04b4b", label: "Red", texture: "coil" },
];

export const HAIR_LENGTHS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
] as const;

export interface EyeColorOption {
  value: string;
  label: string;
  gaze: EyeGaze;
}

export const EYE_COLORS: EyeColorOption[] = [
  { value: "#4a7a3f", label: "Green", gaze: "up" },
  { value: "#4a6fa5", label: "Blue", gaze: "right" },
  { value: "#5c3a21", label: "Brown", gaze: "down" },
  { value: "#8a6a3d", label: "Hazel", gaze: "left" },
];

export interface EyebrowOption {
  value: string;
  label: string;
  color: string;
  shape: EyebrowShape;
}

export const EYEBROW_OPTIONS: EyebrowOption[] = [
  { value: "red", label: "Red", color: "#e0575b", shape: "arc" },
  { value: "green", label: "Green", color: "#4caf50", shape: "peak" },
  { value: "blue", label: "Blue", color: "#2e7dd1", shape: "doublePeak" },
  { value: "purple", label: "Purple", color: "#8e44ad", shape: "mShape" },
  { value: "other", label: "Other", color: "#5a6472", shape: "slanted" },
];

export const TRANSPORT_OPTIONS: { value: Transport; label: string; icon: string }[] = [
  { value: "bus", label: "School Bus", icon: "🚌" },
  { value: "car", label: "Car", icon: "🚗" },
  { value: "bike", label: "Bike", icon: "🚲" },
  { value: "walk", label: "Walk", icon: "🚶" },
];

export const ACTIVITY_OPTIONS: Activity[] = [
  { id: "sports", label: "Sports", shape: "circle" },
  { id: "band", label: "Band / Choir", shape: "rectangle" },
  { id: "club", label: "Club / Group", shape: "star" },
];

export const SCIENCE_FEELINGS: { value: ScienceFeeling; label: string; icon: string }[] = [
  { value: "love", label: "I love it!", icon: "🤩" },
  { value: "fine", label: "It's fine", icon: "🙂" },
  { value: "scary", label: "It's kind of scary", icon: "😬" },
  { value: "dislike", label: "I don't like it", icon: "😕" },
];

export const ICE_CREAM_FLAVORS = [
  { value: "vanilla", label: "Vanilla", color: "#f6ecd9" },
  { value: "chocolate", label: "Chocolate", color: "#6b4226" },
  { value: "other", label: "Other", color: "#f4a3b0" },
];

export const CHARM_SHAPE_LABEL: Record<CharmShape, string> = {
  circle: "Circle",
  rectangle: "Square",
  star: "Star",
};

export const TOTAL_STEPS = 12;
