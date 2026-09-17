import { extractText } from "unpdf";

export async function extractPdfText(bytes: ArrayBuffer): Promise<string> {
  const { text } = await extractText(new Uint8Array(bytes), {
    mergePages: true,
  });
  return text.trim();
}
