export function trimIdFromUrl(url: string) {
  const parts = url.split("/").filter((part) => part !== "");
  const [id] = parts.slice(-1);

  return id;
}
