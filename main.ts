// Notes From a Passive-Aggressive Fridge — make.fun entry.
// Writes one deterministic single-line note to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Node 22+, standard library only, no network, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Kept as a single named constant so it stays byte-identical.
const ENTRY =
  "My sensors say your leftovers have been here nine days. I have started charging them rent.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, and a single line.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`Entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
