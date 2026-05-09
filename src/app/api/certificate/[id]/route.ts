import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Certificate ID is required" },
        { status: 400 }
      );
    }

    const certificate = await db.certificate.findUnique({
      where: { certificateId: id },
    });

    if (!certificate) {
      return NextResponse.json(
        { valid: false, message: "Certificate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      certificate: {
        recipientName: certificate.recipientName,
        courseName: certificate.courseName,
        issueDate: certificate.issueDate,
      },
    });
  } catch (error) {
    console.error("Certificate verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}
