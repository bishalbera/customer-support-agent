import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ngrokUrl = process.env.NGROK_URL!;
  const apiKey = process.env.ANTHROPIC_API_KEY!;

  const anthropic = new Anthropic({ apiKey });

  const formattedMessages = body.messages.map((msg: any) => ({
    role: msg.role,
    content: [
      {
        type: "text",
        text: msg.content,
      },
    ],
  }));

  const response = await anthropic.beta.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: formattedMessages,
    mcp_servers: [
      {
        type: "url",
        url: ngrokUrl,
        name: "mindsdb-mcp",
      },
    ],
    betas: ["mcp-client-2025-04-04"],
  });

  // Extract and combine all "text" parts from the response
  const fullText = response.content
    .filter((block: any) => block.type === "text")
    .map((block: any) => block.text)
    .join("\n\n");

  return NextResponse.json({ content: fullText });
}
