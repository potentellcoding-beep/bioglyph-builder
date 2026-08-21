import { forwardRef } from "react";
import { VIEWBOX } from "@/lib/layout";
import { BioglyphData } from "@/lib/types";
import FaceShapeLayer from "./layers/FaceShapeLayer";
import HairLayer from "./layers/HairLayer";
import EyesLayer from "./layers/EyesLayer";
import EyebrowsLayer from "./layers/EyebrowsLayer";
import NoseLayer from "./layers/NoseLayer";
import CharmsLayer from "./layers/CharmsLayer";
import EarsLayer from "./layers/EarsLayer";
import MouthLayer from "./layers/MouthLayer";
import CheeksLayer from "./layers/CheeksLayer";
import FrecklesLayer from "./layers/FrecklesLayer";
import EyelashesLayer from "./layers/EyelashesLayer";

// index of each feature's question within STEPS — used to keep a feature
// hidden from the cumulative preview until its own step has been reached,
// even if the underlying data already has a valid (e.g. zero) value.
const FEATURE_STEP: Record<string, number> = {
  faceShape: 0,
  hair: 1,
  eyes: 2,
  eyebrows: 3,
  nose: 4,
  charms: 5,
  ears: 6,
  mouth: 7,
  cheeks: 8,
  freckles: 9,
  eyelashes: 10,
};

const BioglyphSVG = forwardRef<
  SVGSVGElement,
  { data: BioglyphData; className?: string; revealUpTo?: number }
>(function BioglyphSVG({ data, className, revealUpTo = Infinity }, ref) {
  const shows = (feature: keyof typeof FEATURE_STEP) => FEATURE_STEP[feature] <= revealUpTo;

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bioglyph preview"
    >
      {shows("faceShape") && <FaceShapeLayer shape={data.faceShape} />}
      {shows("ears") && <EarsLayer siblings={data.siblings} />}
      {shows("cheeks") && <CheeksLayer flavor={data.iceCream} />}
      {shows("freckles") && (
        <FrecklesLayer count={data.birthDay} split={data.freckleSplit} />
      )}
      {shows("hair") && (
        <HairLayer
          strandCount={data.birthMonth}
          color={data.hairColor}
          length={data.hairLength}
        />
      )}
      {shows("eyebrows") && <EyebrowsLayer value={data.eyebrowColor} />}
      {shows("eyes") && <EyesLayer color={data.eyeColor} style={data.eyeStyle} />}
      {shows("eyelashes") && <EyelashesLayer count={data.petTypeCount} />}
      {shows("nose") && <NoseLayer transport={data.transport} />}
      {shows("mouth") && <MouthLayer feeling={data.scienceFeeling} />}
      {shows("charms") && <CharmsLayer activityIds={data.activities} />}
    </svg>
  );
});

export default BioglyphSVG;
