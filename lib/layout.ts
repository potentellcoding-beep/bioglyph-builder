// Shared coordinate system for the bioglyph SVG. All layers reference these
// constants so features line up regardless of which face shape is chosen.

export const VIEWBOX = "0 0 400 480";
export const CANVAS_W = 400;
export const CANVAS_H = 480;

export const FACE_CX = 200;
export const FACE_CY = 250;
export const FACE_W = 216;
export const FACE_H = 268;

// top of the face outline (approx), used to anchor hair
export const FACE_TOP_Y = FACE_CY - FACE_H / 2;
export const FACE_BOTTOM_Y = FACE_CY + FACE_H / 2;
export const FACE_LEFT_X = FACE_CX - FACE_W / 2;
export const FACE_RIGHT_X = FACE_CX + FACE_W / 2;

export const EYE_Y = FACE_CY - 30;
export const EYE_DX = 52;
export const LEFT_EYE_X = FACE_CX - EYE_DX;
export const RIGHT_EYE_X = FACE_CX + EYE_DX;

export const EYEBROW_Y = EYE_Y - 34;

export const NOSE_CX = FACE_CX;
export const NOSE_CY = FACE_CY + 24;

export const MOUTH_CX = FACE_CX;
export const MOUTH_CY = FACE_CY + 92;

export const CHEEK_Y = FACE_CY + 48;
export const LEFT_CHEEK_X = FACE_CX - 84;
export const RIGHT_CHEEK_X = FACE_CX + 84;

export const EAR_Y = FACE_CY - 6;
export const LEFT_EAR_X = FACE_LEFT_X - 6;
export const RIGHT_EAR_X = FACE_RIGHT_X + 6;

export const CHARM_ROW_Y = FACE_BOTTOM_Y + 34;
