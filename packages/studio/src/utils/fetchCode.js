export default async (codeUrl) => {
  const response = await fetch(codeUrl);
  if (!response.ok) {
    throw new Error(`Could not fetch ${codeUrl} (${response.status})`);
  }
  return await response.text();
};
