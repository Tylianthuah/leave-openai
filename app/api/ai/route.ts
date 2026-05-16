import { NextResponse } from "next/server";

import { getAIResponse } from "@/lib/openai/services";

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const messages =
      body.messages;

    if (!messages) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Messages required",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await getAIResponse(
        messages
      );

    return NextResponse.json({
      success: true,

      message:
        response.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}