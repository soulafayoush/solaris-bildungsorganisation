import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleAr, titleEn, contentAr, contentEn, imageUrl, author } = body;

    if (!titleAr || !titleEn || !contentAr || !contentEn) {
      return NextResponse.json(
        { error: "Title and content in both languages are required" },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        titleAr,
        titleEn,
        contentAr,
        contentEn,
        imageUrl,
        author: author || "Zolaris Team",
      },
    });

    return NextResponse.json(
      { message: "Blog post created successfully", id: post.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
