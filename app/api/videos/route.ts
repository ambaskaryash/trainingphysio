import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Configure Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS || '{}'), // Parse credentials from env
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

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

    // Get active subscriptions
    const activeSubscriptions = user.subscriptions.filter(
      (sub) => sub.active && sub.endDate > new Date(),
    );

    // Get all category IDs from active subscriptions
    const categoryIds = activeSubscriptions.flatMap(
      (sub) => sub.plan.categories.map((cat) => cat.id),
    );

    // Get videos from subscribed categories
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

    // Fetch Google Drive URLs for each video (using env variable)
    const videosWithDriveUrls = await Promise.all(
      videos.map(async (video) => {
        const fileId = video.url;

        try {
          // Get the webContentLink (view URL) from Google Drive
          const res = await drive.files.get({
            fileId: fileId,
            fields: "webContentLink",
          });

          const url = res.data.webContentLink;
          return { ...video, url };
        } catch (error) {
          console.error(`Error fetching URL for file ${fileId}:`, error);
          return { ...video, url: null }; // Or handle the error as needed
        }
      }),
    );

    return NextResponse.json(videosWithDriveUrls);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // Use getAuth(req) here as well

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}