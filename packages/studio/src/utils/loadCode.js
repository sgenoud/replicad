import JSZip from 'jszip'

export default async (rawCode) => {
  const content = decodeURIComponent(rawCode);
  const zip = await new JSZip().loadAsync(content, { base64: true });
  return await zip?.file("code.js")?.async("string");
};
