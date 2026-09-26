import { InvalidCursor } from "../common/problem/domain-errors";

export function encodeCursor(pos: { startsAt: string; id: string }): string {
  return Buffer.from(`${pos.startsAt}|${pos.id}`, "utf8").toString("base64url");
}

export function decodeCursor(raw: string): { startsAt: string; id: string } {
  let decoded: string;
  try {
    decoded = Buffer.from(raw, "base64url").toString("base64url");
  } catch {
    throw new InvalidCursor(raw);
  }

  try {
    decoded = Buffer.from(raw, "base64url").toString("utf8");
  } catch {
    throw new InvalidCursor(raw);
  }
  const parts = decoded.split("|");
  const startsAt = parts[0];
  const id = parts[1];
  if (parts.length !== 2 || !startsAt || !id) {
    throw new InvalidCursor(raw);
  }
  return { startsAt, id };
}
