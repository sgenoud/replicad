import { Blueprints, organiseBlueprints } from "./blueprints";
import { BlueprintSketcher } from "./Sketcher2d";
import { Plane, PlaneName, Point } from "./geom";
import { Sketches } from "./sketches";

import { Point2D } from "./lib2d";
import * as opentype from "opentype.js";
import { prepareFontForText } from "./utils/opentype";

const FONT_REGISTER: Record<string, opentype.Font> = {};

// @types/opentype.js still describes v1 and omits these v2 render options.
// CAD consumes outlines, not the SVG images or color layers enabled by default.
const OUTLINE_RENDER_OPTIONS: opentype.RenderOptions & {
  drawLayers: boolean;
  drawSVG: boolean;
} = { drawLayers: false, drawSVG: false };

/**
 * Import a font in the text system. If the font family is not defined it will
 * set its name as "default"
 *
 * The font should be in TTF
 */
export async function loadFont(
  fontPath: string | ArrayBuffer,
  fontFamily = "default",
  force = false
) {
  if (!force && FONT_REGISTER[fontFamily]) {
    console.log(`Font ${fontFamily} already loaded`);
    return FONT_REGISTER[fontFamily];
  }

  let fontData: ArrayBuffer;
  if (typeof fontPath === "string") {
    const response = await fetch(fontPath);
    fontData = await response.arrayBuffer();
  } else {
    fontData = fontPath;
  }

  const font: opentype.Font = opentype.parse(fontData);
  prepareFontForText(font, fontFamily);
  FONT_REGISTER[fontFamily] = font;
  if (!FONT_REGISTER.default) FONT_REGISTER.default = font;

  return font;
}

export const getFont = (fontFamily = "default") => {
  return FONT_REGISTER[fontFamily];
};

const sketchFontCommands = function* (commands: opentype.PathCommand[]) {
  let sk: BlueprintSketcher | null = null;
  let lastPoint: Point2D | null = null;

  for (const command of commands) {
    if (command.type === "Z") {
      if (sk) yield sk.close();
      sk = null;
      continue;
    }

    const p: Point2D = [-command.x, command.y];

    if (command.type === "M") {
      // opentype.js v2 omits Z for filled glyphs, so a new M also ends a contour.
      if (sk) {
        yield sk.close();
      }
      sk = new BlueprintSketcher();
      sk.movePointerTo(p);
      lastPoint = p;
      continue;
    }

    // We do not draw line of length 0
    if (
      lastPoint &&
      Math.abs(p[0] - lastPoint[0]) < 1e-9 &&
      Math.abs(p[1] - lastPoint[1]) < 1e-9
    )
      continue;

    if (command.type === "L") {
      sk?.lineTo(p);
    }

    if (command.type === "C") {
      sk?.cubicBezierCurveTo(
        p,
        [-command.x1, command.y1],
        [-command.x2, command.y2]
      );
    }

    if (command.type === "Q") {
      sk?.quadraticBezierCurveTo(p, [-command.x1, command.y1]);
    }

    lastPoint = p;
  }

  // The final contour has neither a following M nor necessarily an explicit Z.
  if (sk) yield sk.close();
};

/**
 * Creates the `Blueprints` of a text, in a defined font size and a font familiy
 * (which will be the default).
 */
export function textBlueprints(
  text: string,
  { startX = 0, startY = 0, fontSize = 16, fontFamily = "default" } = {}
): Blueprints {
  let font = getFont(fontFamily);
  if (!font) {
    console.warn(
      `Font family "${fontFamily}" not found, please load it first, using the default`
    );
    font = getFont();
  }
  const writtenText = font.getPath(
    text,
    -startX,
    -startY,
    fontSize,
    OUTLINE_RENDER_OPTIONS
  );
  const blueprints = Array.from(sketchFontCommands(writtenText.commands));
  return organiseBlueprints(blueprints).mirror([0, 0]);
}

/**
 * Creates the `Sketches` of a text, in a defined font size and a font familiy
 * (which will be the default).
 */
export function sketchText(
  text: string,
  textConfig?: {
    startX?: number;
    startY?: number;
    fontSize?: number;
    fontFamily?: "string";
  },
  planeConfig: {
    plane?: PlaneName | Plane;
    origin?: Point | number;
  } = {}
): Sketches {
  const textBp = textBlueprints(text, textConfig);
  return planeConfig.plane instanceof Plane
    ? textBp.sketchOnPlane(planeConfig.plane)
    : textBp.sketchOnPlane(planeConfig.plane, planeConfig.origin);
}
