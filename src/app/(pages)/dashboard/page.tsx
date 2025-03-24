"use client";
import CardData from "@/components/CardData.";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/CustomDialog";
import ContentModel from "@/components/ContentModel";
import { useEffect, useState } from "react";
import axios from "axios";

interface ContentType {
  id: string;
  title: string;
  link: string;
  type: "Youtube" | "Tweet";
}

export default function Dashboard() {
  const [contentItem, setContentItem] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchMemory() {
      try {
        const response = await axios.get("/api/all-content");
        if (response.data?.data) {
          setContentItem(response.data.data);
        }
        // TODO: Add toast message
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error occurred", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMemory();
  }, []);

  return (
    <div className="mx-auto max-w-7xl my-16">
      <div className="flex justify-between items-center mr-5">
        <h1 className="text-2xl md:text-3xl font-bold my-10 ml-5">All Items</h1>
        <div className="flex gap-4">
          <Button variant={"outline"}>Share</Button>

          {/* Popup model to add content */}
          <CustomDialog
            trigger={<Button variant={"default"}>Create</Button>}
            title="Add to Secondary Brain"
            description="Paste your link and select type."
          >
            <ContentModel />
          </CustomDialog>
        </div>
      </div>
      {/* Rendering Data in card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center gap-8">
        {loading ? (
          <p className="text-center col-span-full">Loading...</p>
        ) : contentItem.length === 0 ? (
          <p className="text-center col-span-full">No content found.</p>
        ) : (
          contentItem.map((item) => (
            <CardData
              key={item.id}
              type={item.type}
              title={item.title}
              link={item.link}
            />
          ))
        )}
      </div>
    </div>
  );
}
