export const URGENT_KEYWORDS = [
  "bunuh diri", "bunuh", "mengakhiri hidup", "mati saja", "mati aja",
  "melukai diri", "lukai diri", "cutting", "self harm", "pengen mati",
  "tidak mau hidup", "gak kuat hidup", "udah capek hidup"
];

export function findFlaggedWords(text: string | undefined | null): string[] {
  if (!text) return [];
  const s = text.toLowerCase();
  return URGENT_KEYWORDS.filter((w) => s.includes(w));
}