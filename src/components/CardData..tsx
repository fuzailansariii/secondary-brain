"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Share from "./share";
import Trash from "./trash";
import Link from "next/link";
import { extractYouTubeId, extractTweetId } from "@/utils/ExtractIds";
import { Tweet } from "react-tweet";
import axios from "axios";
import { toast } from "sonner";

interface CardDataProps {
  id: string;
  type: "Youtube" | "Tweet" | "Text";
  title: string;
  link: string;
}

export const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <iframe
    className="w-full rounded-lg aspect-video pt-5"
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
);

export default function CardData({ id, title, link, type }: CardDataProps) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-content/${id}`);
      if (response.status === 200) {
        toast.success("Content Deleted Successfully");
      } else {
        toast.error("Failed to delete content");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <div className="w-96">
      {/* Fixed width for all cards */}
      <Card className="h-[400px] flex flex-col justify-between">
        {/* Fixed height */}
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle className="text-xl">{type}</CardTitle>
          </CardHeader>
          <div className="flex gap-4 justify-center items-center mx-5">
            <Link href={link} target="_blank">
              <Share size="sm" />
            </Link>
            <Trash size="sm" handleClick={handleDelete} />
          </div>
        </div>
        <CardContent className="flex-1 overflow-auto">
          <CardTitle>{title}</CardTitle>
          {type === "Youtube" && (
            <>
              {extractYouTubeId(link) ? (
                <YouTubeEmbed videoId={extractYouTubeId(link)!} />
              ) : (
                <p className="text-red-500">Invalid YouTube Link</p>
              )}
            </>
          )}

          {type === "Tweet" && (
            <>
              {extractTweetId(link) ? (
                <Tweet id={extractTweetId(link)!} />
              ) : (
                <p className="text-red-500">Invalid Tweet Link</p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
