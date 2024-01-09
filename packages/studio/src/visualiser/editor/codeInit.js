import axios from "axios";
import JSZip from "jszip";
import loadCode from "../../utils/loadCode"

const DEFAULT_SCRIPT = `
const { draw } = replicad;

const main = () => {
  const baseWidth = 20;
  const height = 100;

  const profile = draw()
    .hLine(baseWidth)
    .smoothSplineTo([baseWidth * 1.5, height * 0.2], {
      endTangent: [0, 1],
    })
    .smoothSplineTo([baseWidth * 0.7, height * 0.7], {
      endTangent: [0, 1],
      startFactor: 3,
    })
    .smoothSplineTo([baseWidth , height], {
      endTangent: [0, 1],
      startFactor: 3,
    })
    .lineTo([0, height])
    .close();

  return profile
    .sketchOnPlane("XZ")
    .revolve()
    .shell(5, (f) => f.containsPoint([0, 0, height]))
    .fillet(1.7, (e) => e.inPlane("XY", height));
};
`;

const TEST_URL =
  "https%3A%2F%2Fraw.githubusercontent.com%2Fsgenoud%2Freplicad%2Fmain%2Fpackages%2Freplicad-docs%2Fexamples%2FsimpleVase.js";

const loadFromUrl = async (url) => {
  const codeUrl = decodeURIComponent(url === "test-shape" ? TEST_URL : url);

  const response = await axios.get(codeUrl);
  return response.data;
};

export const exportCode = async (rawCode) => {
  const zip = new JSZip();
  zip.file("code.js", rawCode);
  const content = await zip.generateAsync({
    type: "base64",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });
  const code = encodeURIComponent(content);

  var url = new URL(window.location);
  url.searchParams.set("code", code);

  return url.toString();
};

const getUrlParam = (paramName) => {
  var url = new URL(window.location);
  const urlParams = url.searchParams;

  const param = urlParams.get(paramName);

  if (!param) return;

  if (!urlParams.has("keep")) {
    urlParams.delete(paramName);
    window.history.pushState({}, "", url);
  }

  return param;
};

export default async function codeInit() {
  const fromUrl = getUrlParam("from-url");
  if (fromUrl) {
    try {
      return await loadFromUrl(fromUrl);
    } catch (e) {
      console.error(e);
    }
  }

  const code = getUrlParam("code");
  if (code) {
    try {
      return await loadCode(code);
    } catch (e) {
      console.error(e);
    }
  }

  const defaultScript = localStorage.getItem("script") || DEFAULT_SCRIPT;
  return defaultScript;
}
