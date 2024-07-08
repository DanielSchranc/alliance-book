export function trimIdFromUrl(url: string) {
  const parts = url.split("/").filter((part) => part !== "");
  const [id] = parts.slice(-1);

  return id;
}

export function isValidUrl(text: string) {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    console.info("url.isValidUrl: invalid URL");
  }
}
