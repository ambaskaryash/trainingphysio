"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    category: {
      name: string;
    };
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail || "https://via.placeholder.com/640x360"}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{video.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
          {video.category.name}
        </span>
      </CardContent>
    </Card>
  );
}