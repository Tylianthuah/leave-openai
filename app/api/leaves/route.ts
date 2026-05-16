import { NextResponse } from "next/server";

import { createLeave } from "@/lib/tools/createLeave";

import {
  leaveApplications,
  leaveBalances,
} from "@/lib/db/db";

export async function GET() {
  return NextResponse.json({
    leaveApplications,
    leaveBalances,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result =
      await createLeave(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}