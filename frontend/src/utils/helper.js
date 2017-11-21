export function formatTimestamp(timestamp) {
  const d = new Date(timestamp);
  return d.toLocaleString();
}
