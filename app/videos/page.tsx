// app/videos/page.tsx
"use client";

import { Loader } from "@/components/ui/loader";
import { VideoCard } from "@/components/video-card";
import { VideoGrid } from "@/components/video-grid";
import { useEffect, useState } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch videos: ${response.status} - ${errorText}`,
          );
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Physiotherapy Videos</h1>
      <VideoGrid>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </VideoGrid>
    </div>
  );
}