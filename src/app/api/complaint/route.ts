import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email, and message are required" },
        { status: 400 }
      );
    }

    const complaint = await db.complaint.create({
      data: {
        fullName,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully", id: complaint.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Complaint error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
