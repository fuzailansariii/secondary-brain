"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Share from "./share";
import Trash from "./trash";
import Link from "next/link";
import { extractYouTubeId, extractTweetId } from "@/utils/ExtractIds";
import { Tweet } from "react-tweet";

interface CardDataProps {
  type: "Youtube" | "Tweet" | "Text";
  title: string;
  link: string;
}

export const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <iframe
    className="w-full rounded-lg aspect-video pt-5"
    src={`https://www.youtube.com/embed/${videoId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
);

export default function CardData({ title, link, type }: CardDataProps) {
  return (
    <div className="w-96">
      {/* Fixed width for all cards */}
      <Card className="h-[400px] flex flex-col justify-between">
        {/* Fixed height */}
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>{type}</CardTitle>
          </CardHeader>
          <div className="flex gap-4 justify-center items-center mx-5">
            <Link href={link} target="_blank">
              <Share size="sm" />
            </Link>
            <Trash size="sm" />
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
