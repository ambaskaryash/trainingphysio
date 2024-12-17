"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export default function AdminVideos() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add video");

      toast({
        title: "Success",
        description: "Video added successfully",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Video</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <div>
          <Input
            {...register("title")}
            placeholder="Video Title"
            className="w-full"
          />
        </div>
        <div>
          <Textarea
            {...register("description")}
            placeholder="Video Description"
            className="w-full"
          />
        </div>
        <div>
          <Input
            {...register("url")}
            placeholder="Video URL"
            className="w-full"
          />
        </div>
        <div>
          <Input
            {...register("thumbnail")}
            placeholder="Thumbnail URL"
            className="w-full"
          />
        </div>
        <div>
          <Select {...register("categoryId")}>
            <option value="">Select Category</option>
            {/* Categories will be fetched and mapped here */}
          </Select>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Video"}
        </Button>
      </form>
    </div>
  );
}