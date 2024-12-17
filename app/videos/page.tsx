"use client";

import { CategoryFilter } from "@/components/category-filter";
import { Loader } from "@/components/ui/loader";
import { VideoCard } from "@/components/video-card";
import { VideoGrid } from "@/components/video-grid";
import { useEffect, useState } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("./api/videos");
        if (!response.ok) throw new Error("Failed to fetch videos");
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

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter((video: any) => video.category.id === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Physiotherapy Videos</h1>
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <VideoGrid>
        {filteredVideos.map((video: any) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </VideoGrid>
    </div>
  );
}