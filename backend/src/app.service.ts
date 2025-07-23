import { GoogleGenAI } from "@google/genai";
import { Injectable } from '@nestjs/common';
export type GeneratePageDto={
  prompt: string;
}
export type GeneratedPage = {
  html: string;
  css: string;
  js?: string;
  title: string;
  description: string;
};
@Injectable()
export class AppService {
genAI = new GoogleGenAI({})

  constructor(
 ) {}
  async generatePage(dto: GeneratePageDto): Promise<GeneratedPage> {
const fullPrompt = `
You are a professional AI web assistant.

Your task is to generate a complete web page based **strictly** on the user's request. You MUST return the result as a valid, parsable JSON object in the exact format below — with no extra text, no markdown, and no explanation.

Strictly output this structure:

{
  "html": "<!DOCTYPE html><html lang='en'>...</html>",
  "css": "body { ... }",
  "js": "// Optional JavaScript code or leave empty",
  "title": "Short page title",
  "description": "Brief description of the page"
}

Important instructions:
- ONLY return a raw JSON object.
- DO NOT wrap it in markdown (e.g., \`\`\`json ... \`\`\`).
- DO NOT add any headings, labels, or comments.
- DO NOT explain anything before or after the JSON.
- The HTML must include head, meta, and body tags.
- The CSS must cover layout, typography, and responsiveness if relevant.
- Use js **only** if interactivity is clearly needed.
- Keep the title and description accurate and concise.

Here is the user's instruction for the page:
"${dto.prompt}"
`;



    const model = this.genAI.models.generateContent({     model: "gemini-2.5-flash",
 contents:fullPrompt
    });

    const text = (await model).text as string;

    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned) as GeneratedPage;
    } catch (e) {
      throw new Error('Failed to parse Gemini response as valid JSON.');
    }
  }
}


