import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      major,
      studyYear,
      gradYear,
      status,
      experience,
      availability,
      reason,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone are required" },
        { status: 400 }
      );
    }

    const application = await db.membershipApplication.create({
      data: {
        fullName,
        email,
        phone,
        dateOfBirth,
        major,
        studyYear,
        gradYear,
        status: status || "student",
        experience,
        availability,
        reason,
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", id: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Membership application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
