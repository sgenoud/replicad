import parse from "parse-css-color";

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

export default function normalizeColor(color) {
  const parsed = parse(color);

  if (!parsed || parsed.type.startsWith("hsl"))
    return { color: "#fff", alpha: 1 };
  return { color: rgbToHex(...parsed.values), alpha: parsed.alpha };
}
