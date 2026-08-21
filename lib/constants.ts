import { Activity, CharmShape, EyebrowShape, FaceShape, ScienceFeeling, Transport } from "./types";

export const FACE_SHAPES: { value: FaceShape; label: string }[] = [
  { value: "oval", label: "Oval" },
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "heart", label: "Heart" },
  { value: "diamond", label: "Diamond" },
  { value: "rectangle", label: "Rectangle" },
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

export const HAIR_COLORS = [
  { value: "#2b1b12", label: "Black" },
  { value: "#5c3a21", label: "Brown" },
  { value: "#a9662d", label: "Auburn" },
  { value: "#e8c26b", label: "Blonde" },
  { value: "#e04b4b", label: "Red" },
  { value: "#8b8b8b", label: "Gray" },
  { value: "#6b3fa0", label: "Purple" },
  { value: "#2e7dd1", label: "Blue" },
];

export const HAIR_LENGTHS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
] as const;

export const EYE_COLORS = [
  { value: "#4a7a3f", label: "Green" },
  { value: "#4a6fa5", label: "Blue" },
  { value: "#5c3a21", label: "Brown" },
  { value: "#8b8b8b", label: "Gray" },
  { value: "#3d2b1f", label: "Hazel" },
  { value: "#1a1a1a", label: "Dark Brown" },
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
  { value: "strawberry", label: "Strawberry", color: "#f4a3b0" },
  { value: "mint", label: "Mint Chip", color: "#a3d9b1" },
  { value: "cookies_cream", label: "Cookies & Cream", color: "#e3e3e3" },
  { value: "rocky_road", label: "Rocky Road", color: "#7a4b3a" },
];

export const CHARM_SHAPE_LABEL: Record<CharmShape, string> = {
  circle: "Circle",
  rectangle: "Rectangle",
  star: "Star",
};

export const TOTAL_STEPS = 12;
