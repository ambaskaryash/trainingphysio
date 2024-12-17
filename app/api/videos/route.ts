// pages/api/videos.js
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        subscriptions: {
          include: {
            plan: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const activeSubscriptions = user.subscriptions.filter(
      (sub) => sub.active && sub.endDate > new Date(),
    );

    const categoryIds = activeSubscriptions.flatMap(
      (sub) => sub.plan.categories.map((cat) => cat.id),
    );

    const videos = await prisma.video.findMany({
      where: {
        categoryId: {
          in: categoryIds,
        },
      },
      include: {
        category: true,
      },
    });

    const videosWithLocalUrls = await Promise.all(
      videos.map(async (video) => {
        const videoPath = path.join(
          process.env.VIDEO_STORAGE_PATH || "public/videos",
          video.url,
        );
        try {
          await fs.access(videoPath);
          const url = `/videos/${video.url}`;
          return { ...video, url };
        } catch (error) {
          console.error(`Error accessing video file ${video.url}:`, error);
          return { ...video, url: null };
        }
      }),
    );

    return NextResponse.json(videosWithLocalUrls);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user || user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnail: data.thumbnail,
        categoryId: data.categoryId,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}